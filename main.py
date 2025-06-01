import random
import csv
import re
import os
from dataclasses import dataclass, field
from typing import List, Callable, Optional, Iterable, Dict


def color(text: str, code: str) -> str:
    """Return text wrapped in ANSI color codes if supported."""
    codes = {
        'red': '\033[91m',
        'green': '\033[92m',
        'cyan': '\033[96m',
        'magenta': '\033[95m',
        'bold': '\033[1m',
        'reset': '\033[0m',
    }
    return f"{codes.get(code, '')}{text}{codes['reset']}"


def roll_d6() -> int:
    """Return a random number between 1 and 6."""
    return random.randint(1, 6)


def roll_d20() -> int:
    """Return a random number between 1 and 20."""
    return random.randint(1, 20)


def shorten_name(name: str, max_length: int = 15) -> str:
    """Return a name shortened to fit within max_length."""
    if len(name) <= max_length:
        return name
    if name.lower().startswith('the '):
        name = name[4:]
        if len(name) <= max_length:
            return name
    parts = name.split()
    if len(parts) > 1:
        short = f"{parts[0]} {parts[1][0]}."
        if len(short) <= max_length:
            return short
    return name[: max_length - 1] + '.'


@dataclass
class Item:
    name: str
    description: str
    effect_text: str = ''
    use_effect: Optional[Callable[['Game', 'Player', str], bool]] = None

    def __str__(self) -> str:
        return self.name

    def apply(self, game: 'Game', player: 'Player', location: str):
        if self.use_effect:
            if self.use_effect(game, player, location):
                return
        if self.effect_text:
            game.apply_effect_text(self.effect_text, player)

@dataclass
class Player:
    name: str
    symbol: str
    x: int = 0
    y: int = 0
    health: int = 10
    morality: int = 6
    sanity: int = 6
    inventory: List[Item] = field(default_factory=list)

    def apply_effect(self, health=0, morality=0, sanity=0, item: Optional[Item]=None):
        self.health = max(0, min(10, self.health + health))
        self.morality = max(0, min(10, self.morality + morality))
        self.sanity = max(0, min(10, self.sanity + sanity))
        if item:
            self.inventory.append(item)

    def add_item(self, item: Item):
        self.inventory.append(item)

    def remove_item(self, item_name: str) -> bool:
        for i, it in enumerate(self.inventory):
            if it.name.lower() == item_name.lower():
                del self.inventory[i]
                return True
        return False

    def has_item(self, item_name: str) -> bool:
        return any(it.name.lower() == item_name.lower() for it in self.inventory)

    def use_item(self, game: 'Game', item_name: str, location: str):
        for i, it in enumerate(self.inventory):
            if it.name.lower() == item_name.lower():
                it.apply(game, self, location)
                del self.inventory[i]
                return
        print(f"{self.name} does not have {item_name}.")

@dataclass
class EncounterCard:
    name: str
    description: str
    effect_text: str = ''
    immediate: Optional[Callable[['Game', Player], None]] = None
    revisit: Optional[Callable[['Game', Player], None]] = None

    def apply(self, game: 'Game', player: Player, first_time: bool = True):
        if first_time:
            print(f"{player.name} encounters {self.name}: {self.description}")
            if self.immediate:
                self.immediate(game, player)
            if self.effect_text:
                game.apply_effect_text(self.effect_text, player)
        else:
            print(f"{player.name} revisits {self.name}.")
            if self.revisit:
                self.revisit(game, player)

    @property
    def short(self) -> str:
        title = self.name.replace('The ', '')
        return title.split()[0]


@dataclass
class FinalGateCard:
    """Cards used during the Final Gate sequence."""
    name: str
    description: str
    effect: Optional[Callable[['Game', Iterable[Player]], None]] = None
    effect_text: str = ''

    def apply(self, game: 'Game', players: Iterable[Player]):
        if self.effect:
            self.effect(game, players)
        if self.effect_text:
            for p in players:
                game.apply_effect_text(self.effect_text, p)

def mirror_of_broken_memories(game: 'Game', player: Player):
    player.apply_effect(sanity=-1)

def whispering_wound(game: 'Game', player: Player):
    player.apply_effect(morality=-1)

def whispering_wound_revisit(game: 'Game', player: Player):
    if player.has_item('Muted Stone'):
        print('Your Muted Stone absorbs the whispers.')
    else:
        player.apply_effect(sanity=-1)

def laughing_statue(game: 'Game', player: Player):
    player.apply_effect(sanity=1)

def echo_well(game: 'Game', player: Player):
    player.apply_effect(morality=1)

def beneath_clockface(game: 'Game', player: Player):
    player.apply_effect(sanity=-1)

def revisit_minus_sanity(game: 'Game', player: Player):
    player.apply_effect(sanity=-1)

def revisit_plus_morality(game: 'Game', player: Player):
    player.apply_effect(morality=1)

# --- New Encounter Effects ---
def crooked_bell_first(game: 'Game', player: Player):
    if player.inventory:
        drop = input('Drop an item to gain 1 Morality? (y/n) ').strip().lower()
        if drop == 'y':
            lost = player.inventory.pop(0)
            print(f'You drop {lost.name}.')
            player.apply_effect(morality=1)
            return
    player.apply_effect(sanity=-1)

def crooked_bell_revisit(game: 'Game', player: Player):
    if not player.inventory:
        player.apply_effect(sanity=1)

def hungering_gate_first(game: 'Game', player: Player):
    if player.inventory:
        feed = input('Feed an item to the Gate? (y/n) ').strip().lower()
        if feed == 'y':
            lost = player.inventory.pop(0)
            print(f'The Gate devours {lost.name}.')
            return
    player.apply_effect(health=-2)

def hungering_gate_revisit(game: 'Game', player: Player):
    if player.health < 10:
        item = game.draw_item()
        if item:
            player.add_item(item)
            print(f'The Gate spits out {item.name}.')

def nameless_grave_first(game: 'Game', player: Player):
    player.apply_effect(morality=1, sanity=-1)

def nameless_grave_revisit(game: 'Game', player: Player):
    player.apply_effect(health=1, morality=-1)

def shiverglass_lake_first(game: 'Game', player: Player):
    choices = [game.draw_item(), game.draw_item()]
    choices = [c for c in choices if c]
    if not choices:
        return
    print('The lake offers you gifts:')
    for i, it in enumerate(choices, 1):
        print(f'{i}: {it.name}')
    pick = input('Choose 1 or 2: ').strip()
    keep = choices[0] if pick != '2' else choices[-1]
    player.add_item(keep)
    print(f'You keep {keep.name}.')
    for it in choices:
        if it is not keep:
            game.item_deck.append(it)

def shiverglass_lake_revisit(game: 'Game', player: Player):
    others = [p for p in game.players if p != player and p.x == player.x and p.y == player.y]
    if others and player.inventory:
        other = others[0]
        item_name = player.inventory[0].name
        player.inventory.pop(0)
        other.add_item(Item(item_name, 'Traded item'))
        print(f'Traded {item_name} with {other.name}.')

def bleeding_window_first(game: 'Game', player: Player):
    player.apply_effect(sanity=-1)
    stone = next((i for i in game.item_deck if i.name == 'Muted Stone'), None)
    if stone:
        game.item_deck.remove(stone)
        player.add_item(stone)
        print('You receive Muted Stone.')

def bleeding_window_revisit(game: 'Game', player: Player):
    choice = input('Trade Sanity for Morality (s) or Morality for Sanity (m)? ').strip().lower()
    if choice == 's':
        player.apply_effect(sanity=1, morality=-1)
    elif choice == 'm':
        player.apply_effect(morality=1, sanity=-1)

# ----- Final Gate encounter effects -----
def abyssal_laugh(game: 'Game', players: Iterable[Player]):
    print('Unseen voices laugh from the darkness...')
    for p in players:
        roll = roll_d6()
        if roll <= 3:
            p.apply_effect(sanity=-1)
            print(f'{p.name} loses 1 Sanity.')
        else:
            p.apply_effect(sanity=1)
            print(f'{p.name} steels themselves and gains 1 Sanity.')


def weighing_sins(game: 'Game', players: Iterable[Player]):
    for p in players:
        choice = input(f'{p.name}: lose 2 Health (h) or 1 Morality (m)? ').strip().lower()
        if choice == 'h':
            p.apply_effect(health=-2)
        else:
            p.apply_effect(morality=-1)


def glimpse_of_light(game: 'Game', players: Iterable[Player]):
    print('A warm light cuts through the gloom, if only for a moment.')
    for p in players:
        p.apply_effect(sanity=1, morality=1)

class Tile:
    def __init__(self):
        self.revealed = False
        self.location: Optional[EncounterCard] = None

class Board:
    def __init__(self, size: int = 5):
        self.size = size
        self.grid = [[Tile() for _ in range(size)] for _ in range(size)]
        # load location data
        with open('locations.csv', newline='') as f:
            locs = {row['Name']: row for row in csv.DictReader(f)}

        start = locs.get('The Fractured Vestibule', {'Description': 'Start'})
        gate = locs.get('The Final Gate', {'Description': 'Exit'})

        # randomly place the Fractured Vestibule each game
        self.start_pos = (
            random.randint(0, size - 1),
            random.randint(0, size - 1),
        )
        start_tile = self.grid[self.start_pos[0]][self.start_pos[1]]
        start_tile.location = EncounterCard(
            name='The Fractured Vestibule',
            description=start['Description'],
        )
        start_tile.revealed = True

        # place the Final Gate somewhere other than start
        while True:
            x, y = random.randint(0, size - 1), random.randint(0, size - 1)
            if (x, y) != self.start_pos:
                self.final_pos = (x, y)
                break

        self.grid[self.final_pos[0]][self.final_pos[1]].location = EncounterCard(
            name='Final Gate',
            description=gate['Description'],
        )

    def in_bounds(self, x: int, y: int) -> bool:
        return 0 <= x < self.size and 0 <= y < self.size

    def move_player(self, player: Player, dx: int, dy: int):
        new_x = player.x + dx
        new_y = player.y + dy
        if not self.in_bounds(new_x, new_y):
            print("Cannot move outside the Abyss.")
            return False
        player.x, player.y = new_x, new_y
        return True

    def tile_at(self, x: int, y: int) -> Tile:
        return self.grid[x][y]

    def display_lines(self, players: List[Player], width: int = 15) -> List[str]:
        lines: List[str] = []
        border = '+' + '+'.join('-' * width for _ in range(self.size)) + '+'
        lines.append(border)
        for y in range(self.size):
            row = '|'
            for x in range(self.size):
                tile = self.grid[x][y]
                players_here = [p for p in players if p.x == x and p.y == y]
                if players_here:
                    cell = 'Both' if len(players_here) == 2 else players_here[0].name
                else:
                    if not tile.revealed:
                        cell = '???'
                    else:
                        cell = tile.location.name if tile.location else ''
                cell = shorten_name(cell, width)
                row += cell.center(width) + '|'
            lines.append(row)
            lines.append(border)
        return lines

class Game:
    def __init__(self):
        self.encounter_lookup: Dict[str, EncounterCard] = {}
        self.item_lookup: Dict[str, Item] = {}
        self.location_lookup: Dict[str, Dict[str, str]] = {}
        self.board = Board()
        self.players = [
            Player('Rob', 'R'),
            Player('Cait', 'C')
        ]
        self.last_action_summary: str = 'Welcome to the Abyss.'
        self.load_locations()
        self.deck = self.create_deck()
        self.item_deck = self.create_item_deck()
        self.final_deck = self.create_final_deck()
        random.shuffle(self.deck)
        self.discovered_log: List[str] = []

        # Both players begin at the Fractured Vestibule
        start_x, start_y = self.board.start_pos
        for p in self.players:
            p.x, p.y = start_x, start_y

        for p in self.players:
            tile = self.board.tile_at(p.x, p.y)
            tile.revealed = True
            if tile.location is None:
                tile.location = self.draw_card()
            if tile.location:
                entry = f"[{p.x},{p.y}] - {tile.location.name} (Encounter)"
                if entry not in self.discovered_log:
                    self.discovered_log.append(entry)

    def load_locations(self):
        with open('locations.csv', newline='') as f:
            for row in csv.DictReader(f):
                self.location_lookup[row['Name'].lower()] = row

    def create_deck(self) -> List[EncounterCard]:
        deck: List[EncounterCard] = []
        with open('cards.csv', newline='') as f:
            for row in csv.DictReader(f):
                card = EncounterCard(
                    name=row['Name'],
                    description=row['Description'],
                    effect_text=row['Effect']
                )
                deck.append(card)
                self.encounter_lookup[card.name.lower()] = card
        random.shuffle(deck)
        return deck

    def create_item_deck(self) -> List[Item]:
        items: List[Item] = []
        with open('items.csv', newline='') as f:
            for row in csv.DictReader(f):
                items.append(Item(row['Name'], row['Description'], effect_text=row['Effect']))
        random.shuffle(items)
        self.item_lookup = {it.name.lower(): Item(it.name, it.description, effect_text=it.effect_text) for it in items}
        return items

    def create_final_deck(self) -> List[FinalGateCard]:
        deck: List[FinalGateCard] = []
        with open('final_encounters.csv', newline='') as f:
            for row in csv.DictReader(f):
                deck.append(
                    FinalGateCard(
                        name=row['Name'],
                        description=row['Description'],
                        effect_text=row['Effect']
                    )
                )
        random.shuffle(deck)
        return deck

    def draw_item(self) -> Optional[Item]:
        if not self.item_deck:
            return None
        return self.item_deck.pop()

    def draw_card(self) -> EncounterCard:
        if not self.deck:
            return EncounterCard('Empty Expanse', 'Nothing happens here.', lambda g, p: None)
        return self.deck.pop()

    def apply_effect_text(self, text: str, player: Player):
        if not text:
            return
        print(f"Effect: {text}")
        lower = text.lower()
        for match in re.findall(r'([+-]?\d+)\s*(health|sanity|morality)', lower):
            val = int(match[0])
            attr = match[1]
            if attr == 'health':
                player.apply_effect(health=val)
            elif attr == 'sanity':
                player.apply_effect(sanity=val)
            elif attr == 'morality':
                player.apply_effect(morality=val)
        for match in re.findall(r'gain(?: item)?[: ]+([^,.]+)', lower):
            name = match.strip().title()
            item = self.item_lookup.get(name.lower(), Item(name, name))
            player.add_item(item)
            print(f'{player.name} gains item: {item.name}')
        if 'lose 1 item' in lower or 'discard one item' in lower:
            if player.inventory:
                lost = player.inventory.pop(0)
                print(f'{player.name} loses {lost.name}')

    def run_final_gate(self) -> bool:
        random.shuffle(self.final_deck)
        trials = self.final_deck[:3]
        print('--- Final Gate Trials ---')
        for card in trials:
            print(f'[{card.name}] {card.description}')
            card.apply(self, self.players)
            for p in self.players:
                if p.health <= 0 or p.sanity <= 0 or p.morality <= 0:
                    print(f'{p.name} could not withstand the final trial...')
                    return True
        print('You have overcome the final trials and escape the Abyss!')
        return True

    def generate_summary(
        self,
        player: Player,
        action: str,
        tile_name: str,
        first_time: bool,
        stat_changes: List[str],
        item_changes: List[str],
    ) -> str:
        """Create a single line summary describing the player's action."""
        parts = [f"{player.name} moved {action}"]
        if tile_name:
            if first_time:
                parts.append(f"and discovered {tile_name} (Encounter)")
            else:
                parts.append(f"and revisited {tile_name}")
        else:
            parts.append("and found nothing")
        if stat_changes:
            parts.append(". " + ", ".join(stat_changes))
        if item_changes:
            parts.append(" " + ", ".join(item_changes))
        return " ".join(parts).strip()
      
    def show_board(self):
        if self.discovered_log:
            print('Discovered Tiles:')
            for entry in self.discovered_log:
                print(entry)
            print()
        for line in self.board.display_lines(self.players):
            print(line)

    def format_stats(self, player: Player, inv_width: int = 10) -> str:
        items = ', '.join(shorten_name(it.name, inv_width) for it in player.inventory)
        if not items:
            items = 'None'
        return (
            f"{player.name} – Health: {player.health} | "
            f"Sanity: {player.sanity} | Morality: {player.morality} | "
            f"Items: [{items}]"
        )

    def render_screen(self, active_player: Player) -> str:
        os.system('cls' if os.name == 'nt' else 'clear')
        board_lines = self.board.display_lines(self.players)
        width = len(board_lines[0])
        left = self.format_stats(self.players[0])
        right = self.format_stats(self.players[1])
        buffer: List[str] = []

        # Narrative summary block
        if self.last_action_summary:
            buffer.append(self.last_action_summary)
            buffer.append('')

        # Player stats stacked for readability
        buffer.append(left.ljust(width))
        buffer.append(right.ljust(width))
        buffer.append('')

        # Discovered tile log
        if self.discovered_log:
            buffer.append('Discovered Tiles:')
            buffer.extend(self.discovered_log)
            buffer.append('')

        # Game board
        buffer.extend(board_lines)
        buffer.append('')

        # Command options
        buffer.append('Commands: w/a/s/d, use <item>, trade <item>, lookup encounter <name>, lookup item <name>, lookup location <name>')
        buffer.append('')

        # Prompt
        buffer.append(f"{active_player.name}'s move:")
        print('\n'.join(buffer))
        return input('> ').strip().lower()

    def perform_lookup(self, category: str, name: str):
        key = name.lower()
        if category == 'item':
            item = self.item_lookup.get(key)
            if item:
                print(f"{item.name}: {item.description}")
                if item.effect_text:
                    print(f"Effect: {item.effect_text}")
                return
        elif category in ('encounter', 'card'):
            card = self.encounter_lookup.get(key)
            if card:
                print(f"{card.name}: {card.description}")
                if card.effect_text:
                    print(f"Effect: {card.effect_text}")
                return
        elif category == 'location':
            loc = self.location_lookup.get(key)
            if loc:
                print(f"{loc['Name']}: {loc['Description']}")
                if loc.get('Effect'):
                    print(f"Effect: {loc['Effect']}")
                return
        print('Nothing found with that name.')


    def handle_tile(self, player: Player, direction: str) -> (bool, str):
        tile = self.board.tile_at(player.x, player.y)
        first_time = not tile.revealed
        if first_time:
            tile.revealed = True
            if tile.location is None:
                tile.location = self.draw_card()
            if tile.location:
                entry = f"[{player.x},{player.y}] - {tile.location.name} (Encounter)"
                self.discovered_log.append(entry)

        before = (player.health, player.sanity, player.morality)
        before_items = [it.name for it in player.inventory]

        if tile.location:
            tile.location.apply(self, player, first_time)

        after = (player.health, player.sanity, player.morality)
        after_items = [it.name for it in player.inventory]

        stat_changes = []
        labels = ['Health', 'Sanity', 'Morality']
        for idx, (b, a) in enumerate(zip(before, after)):
            diff = a - b
            if diff:
                sign = '+' if diff > 0 else ''
                color_code = 'green' if diff > 0 else 'red'
                stat_changes.append(color(f"{sign}{diff} {labels[idx]}", color_code))

        gained = [it for it in after_items if it not in before_items]
        lost = [it for it in before_items if it not in after_items]
        item_changes = []
        for it in gained:
            item_changes.append(color(f"gained item: {it}", 'cyan'))
        for it in lost:
            item_changes.append(color(f"lost item: {it}", 'red'))

        tile_name = tile.location.name if tile.location else ''
        summary = self.generate_summary(player, direction, tile_name, first_time, stat_changes, item_changes)

        if tile.location and tile.location.name == 'Final Gate':
            if all(p.x == player.x and p.y == player.y and p.sanity >= 3 and p.morality >= 3 for p in self.players):
                game_over = self.run_final_gate()
                return game_over, summary

        if player.health == 0 or player.sanity == 0 or player.morality == 0:
            print(f"{player.name} has fallen in the Abyss...")
            return True, summary
        return False, summary

    def trade(self, from_player: Player, to_player: Player, item_name: str):
        if from_player.x != to_player.x or from_player.y != to_player.y:
            print("Both players must be on the same tile to trade.")
            return
        for i, it in enumerate(from_player.inventory):
            if it.name.lower() == item_name.lower():
                from_player.inventory.pop(i)
                to_player.inventory.append(it)
                print(f"{from_player.name} traded {it.name} to {to_player.name}.")
                return
        print(f"{from_player.name} does not have {item_name}.")

    def player_turn(self, player: Player) -> bool:
        while True:
            action = self.render_screen(player)
            if action.startswith('lookup'):
                parts = action.split(maxsplit=2)
                if len(parts) >= 3:
                    self.perform_lookup(parts[1], parts[2])
                else:
                    print('Usage: lookup <encounter|item|location> <name>')
                input('Press Enter to continue...')
                continue
            if action.startswith('trade'):
                parts = action.split(maxsplit=1)
                if len(parts) == 2:
                    other = self.players[1] if player == self.players[0] else self.players[0]
                    self.trade(player, other, parts[1])
                self.last_action_summary = f"{player.name} traded {parts[1]}."
                input('Press Enter to continue...')
                return False
            if action.startswith('use'):
                parts = action.split(maxsplit=1)
                if len(parts) == 2:
                    tile = self.board.tile_at(player.x, player.y)
                    name = tile.location.name if tile.location else ''
                    player.use_item(self, parts[1], name)
                self.last_action_summary = f"{player.name} used {parts[1]}."
                input('Press Enter to continue...')
                return False
            moves = {'w': (0,-1), 'a': (-1,0), 's': (0,1), 'd': (1,0)}
            if action in moves:
                dx, dy = moves[action]
                if self.board.move_player(player, dx, dy):
                    dir_word = {'w': 'up', 'a': 'left', 's': 'down', 'd': 'right'}[action]
                    game_over, summary = self.handle_tile(player, dir_word)
                    self.last_action_summary = summary
                    return game_over
                self.last_action_summary = f"{player.name} cannot move that way."
                input('Press Enter to continue...')
                return False
            print('Invalid action.')
            input('Press Enter to continue...')

    def play(self):
        print('--- Laughing in the Abyss ---')
        game_over = False
        while not game_over:
            for player in self.players:
                game_over = self.player_turn(player)
                if game_over:
                    break

if __name__ == '__main__':
    Game().play()
