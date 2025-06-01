import random
import csv
import re
from dataclasses import dataclass, field
from typing import List, Callable, Optional, Iterable, Dict


def roll_d6() -> int:
    """Return a random number between 1 and 6."""
    return random.randint(1, 6)


def roll_d20() -> int:
    """Return a random number between 1 and 20."""
    return random.randint(1, 20)


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

        start_tile = self.grid[0][0]
        start_tile.location = EncounterCard(
            name='The Fractured Vestibule',
            description=start['Description'],
        )
        start_tile.revealed = True

        # place the Final Gate somewhere other than start
        while True:
            x, y = random.randint(0, size - 1), random.randint(0, size - 1)
            if (x, y) != (0, 0):
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

    def display(self, players: List[Player], width: int = 15):
        border = '+' + '+'.join('-' * width for _ in range(self.size)) + '+'
        print(border)
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
                row += cell.center(width) + '|'
            print(row)
            print(border)

class Game:
    def __init__(self):
        self.board = Board()
        self.players = [
            Player('Rob', 'R'),
            Player('Cait', 'C')
        ]
        self.deck = self.create_deck()
        self.item_deck = self.create_item_deck()
        self.final_deck = self.create_final_deck()
        random.shuffle(self.deck)
        self.discovered_log: List[str] = []

    def create_deck(self) -> List[EncounterCard]:
        deck: List[EncounterCard] = []
        with open('cards.csv', newline='') as f:
            for row in csv.DictReader(f):
                deck.append(
                    EncounterCard(
                        name=row['Name'],
                        description=row['Description'],
                        effect_text=row['Effect']
                    )
                )
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
      
    def show_board(self):
        if self.discovered_log:
            print('Discovered Tiles:')
            for entry in self.discovered_log:
                print(entry)
            print()
        self.board.display(self.players)


    def handle_tile(self, player: Player):
        tile = self.board.tile_at(player.x, player.y)
        first_time = not tile.revealed
        if first_time:
            tile.revealed = True
            if tile.location is None:
                tile.location = self.draw_card()
            if tile.location:
                entry = f"[{player.x},{player.y}] - {tile.location.name} (Encounter)"
                self.discovered_log.append(entry)
        if tile.location:
            tile.location.apply(self, player, first_time)
        if tile.location and tile.location.name == 'Final Gate':
            if all(p.x == player.x and p.y == player.y and p.sanity >= 3 and p.morality >= 3 for p in self.players):
                return self.run_final_gate()
        if player.health == 0 or player.sanity == 0 or player.morality == 0:
            print(f"{player.name} has fallen in the Abyss...")
            return True
        return False

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
        self.show_board()
        items = [it.name for it in player.inventory]
        print(f"{player.name}'s stats: H={player.health} M={player.morality} S={player.sanity} Items={items}")
        action = input(f"{player.name}'s move (w/a/s/d, trade <item>, use <item>): ").strip().lower()
        if action.startswith('trade'):
            parts = action.split()
            if len(parts) == 2:
                other = self.players[1] if player == self.players[0] else self.players[0]
                self.trade(player, other, parts[1])
            return False
        if action.startswith('use'):
            parts = action.split()
            if len(parts) == 2:
                tile = self.board.tile_at(player.x, player.y)
                name = tile.location.name if tile.location else ''
                player.use_item(self, parts[1], name)
            return False
        moves = {'w': (0,-1), 'a': (-1,0), 's': (0,1), 'd': (1,0)}
        if action in moves:
            dx, dy = moves[action]
            if self.board.move_player(player, dx, dy):
                return self.handle_tile(player)
        else:
            print('Invalid action.')
        return False

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
