import random
from dataclasses import dataclass, field
from typing import List, Callable, Optional

@dataclass
class Player:
    name: str
    symbol: str
    x: int = 2
    y: int = 2
    health: int = 10
    morality: int = 10
    sanity: int = 10
    inventory: List[str] = field(default_factory=list)

    def apply_effect(self, health=0, morality=0, sanity=0, item: Optional[str]=None):
        self.health = max(0, min(10, self.health + health))
        self.morality = max(0, min(10, self.morality + morality))
        self.sanity = max(0, min(10, self.sanity + sanity))
        if item:
            self.inventory.append(item)

@dataclass
class EncounterCard:
    name: str
    description: str
    immediate: Callable[[Player], None]
    revisit: Callable[[Player], None] = lambda player: None

    def apply(self, player: Player, first_time: bool = True):
        if first_time:
            print(f"{player.name} encounters {self.name}: {self.description}")
            self.immediate(player)
        else:
            print(f"{player.name} revisits {self.name}.")
            self.revisit(player)

def mirror_of_broken_memories(player: Player):
    player.apply_effect(sanity=-1, item='Rusty Mirror')

def whispering_wound(player: Player):
    player.apply_effect(morality=-1)

def laughing_statue(player: Player):
    player.apply_effect(sanity=1)

def echo_well(player: Player):
    player.apply_effect(morality=1)

def beneath_clockface(player: Player):
    player.apply_effect(sanity=-1)

def revisit_minus_sanity(player: Player):
    player.apply_effect(sanity=-1)

def revisit_plus_morality(player: Player):
    player.apply_effect(morality=1)

class Tile:
    def __init__(self):
        self.revealed = False
        self.card: Optional[EncounterCard] = None

class Board:
    def __init__(self, size: int = 5):
        self.size = size
        self.grid = [[Tile() for _ in range(size)] for _ in range(size)]
        self.final_pos = (random.randint(0, size-1), random.randint(0, size-1))
        self.grid[self.final_pos[0]][self.final_pos[1]].card = EncounterCard(
            name='Final Gate',
            description='The gateway out of the Abyss.',
            immediate=lambda p: None,
            revisit=lambda p: None
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
                        symbol = 'B'
                    else:
                        symbol = players_here[0].symbol
                else:
                    tile = self.grid[x][y]
                    if tile.revealed:
                        symbol = 'X'
                row.append(symbol)
            print(' '.join(row))
        print('\nDiscovered locations:')
        for x in range(self.size):
            for y in range(self.size):
                tile = self.grid[x][y]
                if tile.revealed and tile.card:
                    print(f"({x},{y}) {tile.card.name}")
        print()

class Game:
    def __init__(self):
        self.board = Board()
        self.players = [
            Player('Rob', 'R'),
            Player('Cait', 'C')
        ]
        self.deck = self.create_deck()
        random.shuffle(self.deck)

    def create_deck(self) -> List[EncounterCard]:
        return [
            EncounterCard('Mirror of Broken Memories', 'Shards reflect forgotten faces.', mirror_of_broken_memories, revisit_minus_sanity),
            EncounterCard('The Whispering Wound', 'Pain speaks softly here.', whispering_wound, revisit_minus_sanity),
            EncounterCard('The Laughing Statue', 'Its grin unsettles yet comforts.', laughing_statue),
            EncounterCard('Echo Well', 'Voices echo with truth.', echo_well, revisit_plus_morality),
            EncounterCard('Beneath the Clockface', 'Time twists around you.', beneath_clockface, laughing_statue)
        ]

    def draw_card(self) -> EncounterCard:
        if not self.deck:
            return EncounterCard('Empty Expanse', 'Nothing happens here.', lambda p: None)
        return self.deck.pop()

    def handle_tile(self, player: Player):
        tile = self.board.tile_at(player.x, player.y)
        first_time = not tile.revealed
        if first_time:
            tile.revealed = True
            if tile.card is None:
                tile.card = self.draw_card()
        if tile.card:
            tile.card.apply(player, first_time)
        if tile.card and tile.card.name == 'Final Gate':
            print(f"{player.name} has found the Final Gate! You win!")
            return True
        if player.health == 0 or player.sanity == 0 or player.morality == 0:
            print(f"{player.name} has fallen in the Abyss...")
            return True
        return False

    def trade(self, from_player: Player, to_player: Player, item: str):
        if from_player.x != to_player.x or from_player.y != to_player.y:
            print("Both players must be on the same tile to trade.")
            return
        if item not in from_player.inventory:
            print(f"{from_player.name} does not have {item}.")
            return
        from_player.inventory.remove(item)
        to_player.inventory.append(item)
        print(f"{from_player.name} traded {item} to {to_player.name}.")

    def player_turn(self, player: Player) -> bool:
        self.board.display(self.players)
        print(f"{player.name}'s stats: H={player.health} M={player.morality} S={player.sanity} Items={player.inventory}")
        action = input(f"{player.name}'s move (w/a/s/d or trade <item>): ").strip().lower()
        if action.startswith('trade'):
            parts = action.split()
            if len(parts) == 2:
                other = self.players[1] if player == self.players[0] else self.players[0]
                self.trade(player, other, parts[1])
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
