import random
from dataclasses import dataclass, field
from typing import List, Callable, Optional


@dataclass
class Item:
    name: str
    description: str
    use_effect: Optional[Callable[['Player', str], bool]] = None

    def __str__(self) -> str:
        return self.name

@dataclass
class Player:
    name: str
    symbol: str
    x: int = 2
    y: int = 2
    health: int = 10
    morality: int = 10
    sanity: int = 10
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

    def use_item(self, item_name: str, location: str):
        for i, it in enumerate(self.inventory):
            if it.name.lower() == item_name.lower():
                if it.use_effect and it.use_effect(self, location):
                    del self.inventory[i]
                return
        print(f"{self.name} does not have {item_name}.")

@dataclass
class EncounterCard:
    name: str
    description: str
    immediate: Callable[['Game', Player], None]
    revisit: Callable[['Game', Player], None] = lambda game, player: None

    def apply(self, game: 'Game', player: Player, first_time: bool = True):
        if first_time:
            print(f"{player.name} encounters {self.name}: {self.description}")
            self.immediate(game, player)
        else:
            print(f"{player.name} revisits {self.name}.")
            self.revisit(game, player)

    @property
    def short(self) -> str:
        title = self.name.replace('The ', '')
        return title.split()[0]

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

class Tile:
    def __init__(self):
        self.revealed = False
        self.location: Optional[EncounterCard] = None

class Board:
    def __init__(self, size: int = 5):
        self.size = size
        self.grid = [[Tile() for _ in range(size)] for _ in range(size)]
        self.final_pos = (random.randint(0, size-1), random.randint(0, size-1))
        self.grid[self.final_pos[0]][self.final_pos[1]].location = EncounterCard(
            name='Final Gate',
            description='The gateway out of the Abyss.',
            immediate=lambda g, p: None,
            revisit=lambda g, p: None
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

    def display(self, players: List[Player]):
        for y in range(self.size):
            row = []
            for x in range(self.size):
                symbol = '?'
                players_here = [p for p in players if p.x == x and p.y == y]
                if players_here:
                    if len(players_here) == 2:
                        symbol = '2'
                    else:
                        symbol = players_here[0].symbol
                else:
                    tile = self.grid[x][y]
                    if tile.revealed:
                        symbol = tile.location.short if tile.location else 'X'
                row.append(symbol)
            print(' '.join(row))
        print('\nDiscovered locations:')
        for x in range(self.size):
            for y in range(self.size):
                tile = self.grid[x][y]
                if tile.revealed and tile.location:
                    print(f"({x},{y}) {tile.location.name}")
        print()

class Game:
    def __init__(self):
        self.board = Board()
        self.players = [
            Player('Rob', 'R'),
            Player('Cait', 'C')
        ]
        self.deck = self.create_deck()
        self.item_deck = self.create_item_deck()
        random.shuffle(self.deck)

    def create_deck(self) -> List[EncounterCard]:
        return [
            EncounterCard('Mirror of Broken Memories', 'Shards reflect forgotten faces.', mirror_of_broken_memories, revisit_minus_sanity),
            EncounterCard('The Whispering Wound', 'Pain speaks softly here.', whispering_wound, whispering_wound_revisit),
            EncounterCard('The Laughing Statue', 'Its grin unsettles yet comforts.', laughing_statue),
            EncounterCard('Echo Well', 'Voices echo with truth.', echo_well, revisit_plus_morality),
            EncounterCard('Beneath the Clockface', 'Time twists around you.', beneath_clockface, laughing_statue),

            EncounterCard('The Crooked Bell', 'It rings once when you arrive. And again when you lie.', crooked_bell_first, crooked_bell_revisit),
            EncounterCard('The Hungering Gate', 'A doorway with teeth. It doesn\'t open. It feeds.', hungering_gate_first, hungering_gate_revisit),
            EncounterCard('The Nameless Grave', 'A mound of earth. Yours? Mine? Who\'s counting anymore.', nameless_grave_first, nameless_grave_revisit),
            EncounterCard('The Shiverglass Lake', 'A reflection that trembles. It looks back.', shiverglass_lake_first, shiverglass_lake_revisit),
            EncounterCard('The Bleeding Window', 'Something on the other side weeps when you approach.', bleeding_window_first, bleeding_window_revisit)
        ]

    def create_item_deck(self) -> List[Item]:
        def glass_memory_effect(player: Player, location: str) -> bool:
            if location == 'Mirror of Broken Memories':
                player.apply_effect(sanity=1)
                print('The shard restores a sliver of your sanity.')
                return True
            print('Nothing happens.')
            return False

        return [
            Item('Glass Memory', 'A broken shard that reflects who you were, not who you are.', glass_memory_effect),
            Item('Eternal Candle', 'Burns in defiance of darkness. Comforts the soul.'),
            Item('Bone Charm', 'Strung together from something that used to laugh.'),
            Item('Memory Tome', 'Pages filled with words you didn\'t write but remember anyway.'),
            Item('Muted Stone', 'Warm and silent, like holding someone\'s last word.')
        ]

    def draw_item(self) -> Optional[Item]:
        if not self.item_deck:
            return None
        return self.item_deck.pop()

    def draw_card(self) -> EncounterCard:
        if not self.deck:
            return EncounterCard('Empty Expanse', 'Nothing happens here.', lambda g, p: None)
        return self.deck.pop()

    def handle_tile(self, player: Player):
        tile = self.board.tile_at(player.x, player.y)
        first_time = not tile.revealed
        if first_time:
            tile.revealed = True
            if tile.location is None:
                tile.location = self.draw_card()
        if tile.location:
            tile.location.apply(self, player, first_time)
        if tile.location and tile.location.name == 'Final Gate':
            if all(p.x == player.x and p.y == player.y and p.sanity >= 3 and p.morality >= 3 for p in self.players):
                print('Both players stand before the Final Gate with clear minds. You escape!')
                return True
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
        self.board.display(self.players)
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
                player.use_item(parts[1], name)
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
