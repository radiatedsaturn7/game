import random
from dataclasses import dataclass, field
from typing import Callable, List, Optional


@dataclass
class Player:
    name: str
    symbol: str
    x: int
    y: int
    health: int = 10
    morality: int = 10
    sanity: int = 10
    inventory: List[str] = field(default_factory=list)
    skip_turns: int = 0
    prev_x: int = 0
    prev_y: int = 0


@dataclass
class EncounterCard:
    name: str
    description: str
    first_time: Callable[[Player], None]
    revisit: Callable[[Player], None]

    def trigger(self, game: 'Game', player: Player, first: bool):
        print(f"\n{player.name} encounters {self.name}: {self.description}")
        if first:
            self.first_time(player)
        else:
            self.revisit(player)


class Tile:
    def __init__(self):
        self.revealed = False
        self.card: Optional[EncounterCard] = None


class GameBoard:
    def __init__(self, size: int = 5):
        self.size = size
        self.tiles = [[Tile() for _ in range(size)] for _ in range(size)]

    def in_bounds(self, x: int, y: int) -> bool:
        return 0 <= x < self.size and 0 <= y < self.size

    def tile_at(self, x: int, y: int) -> Tile:
        return self.tiles[x][y]

    def move_player(self, player: Player, dx: int, dy: int) -> bool:
        new_x = player.x + dx
        new_y = player.y + dy
        if not self.in_bounds(new_x, new_y):
            print("Cannot move outside the Abyss.")
            return False
        player.prev_x, player.prev_y = player.x, player.y
        player.x, player.y = new_x, new_y
        return True

    def display(self, players: List[Player]):
        for y in range(self.size):
            row = []
            for x in range(self.size):
                tile = self.tiles[x][y]
                symbol = '?' if not tile.revealed else (tile.card.name[:6] if tile.card else ' ')
                for p in players:
                    if p.x == x and p.y == y:
                        symbol = p.symbol if symbol == '?' else p.symbol
                row.append(f"{symbol:^6}")
            print(' '.join(row))
        print()


class Game:
    def __init__(self):
        self.board = GameBoard()
        self.players = [
            Player('Rob', 'R', random.randint(0, 4), random.randint(0, 4)),
            Player('Cait', 'C', random.randint(0, 4), random.randint(0, 4))
        ]
        self.deck = self.create_deck()
        random.shuffle(self.deck)
        self.won = False

    def other_player(self, player: Player) -> Player:
        return self.players[1] if player == self.players[0] else self.players[0]

    # Encounter definitions -------------------------------------------------
    def card_mirror_first(self, player: Player):
        player.sanity = max(0, player.sanity - 2)
        choice = input("Pick up a shard for +1 Morality and item Glass Memory? (y/n): ").lower()
        if choice.startswith('y'):
            player.morality = min(10, player.morality + 1)
            player.inventory.append('Glass Memory')

    def card_mirror_revisit(self, player: Player):
        if 'Glass Memory' in player.inventory:
            choice = input("Use Glass Memory to restore 1 Sanity to (rob/cait/skip): ").lower()
            if choice.startswith('r') or choice.startswith('c'):
                target = self.players[0] if choice.startswith('r') else self.players[1]
                player.inventory.remove('Glass Memory')
                target.sanity = min(10, target.sanity + 1)
                print(f"{target.name} regains 1 Sanity.")

    def card_candle_first(self, player: Player):
        player.sanity = min(10, player.sanity + 1)
        if random.random() < 0.5:
            player.inventory.append('Eternal Candle')
            print("You obtain the Eternal Candle.")

    def card_candle_revisit(self, player: Player):
        if 'Eternal Candle' in player.inventory:
            player.morality = min(10, player.morality + 1)
            print("The Eternal Candle soothes your soul (+1 Morality).")

    def card_wound_first(self, player: Player):
        if player.inventory:
            choice = input("Lose 1 Morality or discard an item? (morality/item): ").lower()
            if choice.startswith('i'):
                print(f"Inventory: {player.inventory}")
                item = input("Choose item to discard: ")
                if item in player.inventory:
                    player.inventory.remove(item)
                    print(f"{player.name} discards {item}.")
                else:
                    player.morality = max(0, player.morality - 1)
            else:
                player.morality = max(0, player.morality - 1)
        else:
            player.morality = max(0, player.morality - 1)

    def card_wound_revisit(self, player: Player):
        if 'Muted Stone' not in player.inventory:
            player.sanity = max(0, player.sanity - 1)
            print("Whispers erode your sanity (-1).")

    def card_clock_first(self, player: Player):
        player.skip_turns += 1
        player.health = min(10, player.health + 1)
        player.morality = min(10, player.morality + 1)
        print("Time warps... You gain +1 Health and +1 Morality but skip next turn.")

    def card_statue_first(self, player: Player):
        roll = random.randint(1, 6)
        if roll <= 2:
            player.sanity = max(0, player.sanity - 2)
            print("The statue steals your laughter (-2 Sanity).")
        elif roll <= 4:
            print("Nothing happens.")
        else:
            player.inventory.append('Bone Charm')
            print("You obtain a Bone Charm.")

    def card_statue_revisit(self, player: Player):
        if 'Bone Charm' not in player.inventory:
            player.sanity = max(0, player.sanity - 1)
            player.x, player.y = player.prev_x, player.prev_y
            print("The statue pushes you back (-1 Sanity).")

    def card_echo_first(self, player: Player):
        player.morality = max(0, player.morality - 1)
        item = random.choice(['Muted Stone', 'Silver Key', 'Odd Trinket'])
        player.inventory.append(item)
        print(f"The well offers you {item} but costs 1 Morality.")

    def card_echo_revisit(self, player: Player):
        if player.inventory:
            print(f"Inventory: {player.inventory}")
            item = input("Trade which item or 'none' to ignore: ")
            if item in player.inventory:
                player.inventory.remove(item)
                new_item = random.choice(['Muted Stone', 'Silver Key', 'Odd Trinket'])
                player.inventory.append(new_item)
                print(f"You trade {item} for {new_item}.")
            elif item != 'none':
                print("No such item.")
        else:
            player.sanity = max(0, player.sanity - 1)
            print("The echo mocks your emptiness (-1 Sanity).")

    def card_hall_first(self, player: Player):
        others_here = all(p.x == player.x and p.y == player.y for p in self.players)
        if others_here:
            for p in self.players:
                p.morality = min(10, p.morality + 1)
            print("Familiar eyes comfort you both (+1 Morality each).")
        else:
            player.morality = max(0, player.morality - 1)
            print("Alone, the eyes judge you (-1 Morality).")

    def card_hall_revisit(self, player: Player):
        others_here = all(p.x == player.x and p.y == player.y for p in self.players)
        if others_here:
            for p in self.players:
                p.morality = min(10, p.morality + 1)
            print("The eyes watch kindly this time (+1 Morality each).")

    def card_library_first(self, player: Player):
        player.inventory.append('Memory Tome')
        choice = input("Use the tome to (1) restore 2 Sanity or (2) reveal 2 tiles?: ")
        if choice.strip() == '1':
            player.sanity = min(10, player.sanity + 2)
        else:
            for _ in range(2):
                try:
                    x = int(input("Reveal x (0-4): "))
                    y = int(input("Reveal y (0-4): "))
                except ValueError:
                    continue
                if self.board.in_bounds(x, y):
                    t = self.board.tile_at(x, y)
                    if not t.revealed:
                        t.revealed = True
                        if t.card is None:
                            t.card = self.draw_card()
                        print(f"Revealed {t.card.name} at ({x},{y})")

    def card_library_revisit(self, player: Player):
        if 'Memory Tome' in player.inventory:
            player.sanity = min(10, player.sanity + 1)
            print("The tome restores a memory (+1 Sanity).")

    def card_weight_first(self, player: Player):
        choice = input("Who gains the Morality? (rob/cait): ").lower()
        giver = self.players[0] if choice.startswith('c') else self.players[1]
        receiver = self.players[1] if choice.startswith('c') else self.players[0]
        receiver.morality = min(10, receiver.morality + 2)
        giver.sanity = max(0, giver.sanity - 1)
        print(f"{receiver.name} gains Morality, {giver.name} loses Sanity.")

    def card_weight_revisit(self, player: Player):
        choice = input("Who gains the Morality? (rob/cait): ").lower()
        giver = self.players[0] if choice.startswith('c') else self.players[1]
        receiver = self.players[1] if choice.startswith('c') else self.players[0]
        receiver.morality = min(10, receiver.morality + 4)
        giver.sanity = max(0, giver.sanity - 2)
        print(f"{receiver.name} gains much Morality, {giver.name} loses more Sanity.")

    def card_final_gate(self, player: Player):
        others_here = all(p.x == player.x and p.y == player.y for p in self.players)
        if others_here:
            if all(p.morality > 2 and p.sanity > 2 for p in self.players):
                self.won = True
                print("Both stand before the gate with clear minds and hearts. You escape!")
            else:
                print("The gate rejects your unbalanced souls.")
        else:
            player.sanity = max(0, player.sanity - 1)
            print("You wait at the gate... sanity slips (-1 Sanity).")

    # Deck ------------------------------------------------------------
    def create_deck(self) -> List[EncounterCard]:
        return [
            EncounterCard('Mirror of Broken Memories', 'You step toward the shimmer, and your reflection smiles before you do...', self.card_mirror_first, self.card_mirror_revisit),
            EncounterCard('The Candle That Would Not Die', 'A single flame flickers in defiance of the void...', self.card_candle_first, self.card_candle_revisit),
            EncounterCard('The Whispering Wound', 'Voices echo from a gash in the floor...', self.card_wound_first, self.card_wound_revisit),
            EncounterCard('Beneath the Clockface', 'Time ticks wrong here...', self.card_clock_first, lambda g, p: None),
            EncounterCard('The Laughing Statue', "It's made of teeth. And it laughs with yours...", self.card_statue_first, self.card_statue_revisit),
            EncounterCard('The Echo Well', 'Drop a secret in the well. Get something back...', self.card_echo_first, self.card_echo_revisit),
            EncounterCard('Hall of Familiar Eyes', 'You recognize every pair of eyes in the wall...', self.card_hall_first, self.card_hall_revisit),
            EncounterCard('The Dead Library', 'Books whisper as they rot...', self.card_library_first, self.card_library_revisit),
            EncounterCard('The Weightless Choice', 'Two doors. One opens to you. One to me...', self.card_weight_first, self.card_weight_revisit),
            EncounterCard('Final Gate', 'You reach the edge of all things...', self.card_final_gate, self.card_final_gate)
        ]

    def draw_card(self) -> EncounterCard:
        if not self.deck:
            return EncounterCard('Empty Expanse', 'Only silence remains here.', lambda g, p: None, lambda g, p: None)
        return self.deck.pop()

    # Game logic ------------------------------------------------------
    def handle_tile(self, player: Player) -> bool:
        tile = self.board.tile_at(player.x, player.y)
        first = not tile.revealed
        if first:
            tile.revealed = True
            if tile.card is None:
                tile.card = self.draw_card()
        tile.card.trigger(self, player, first)
        if self.won:
            return True
        if player.health <= 0 or player.sanity <= 0 or player.morality <= 0:
            print(f"{player.name} can no longer continue...")
            return True
        return False

    def trade(self, player: Player, item: str):
        other = self.other_player(player)
        if player.x != other.x or player.y != other.y:
            print("Both players must be on the same tile to trade.")
            return
        if item not in player.inventory:
            print("You do not possess that item.")
            return
        player.inventory.remove(item)
        other.inventory.append(item)
        print(f"{player.name} trades {item} to {other.name}.")

    def player_turn(self, player: Player) -> bool:
        if player.skip_turns > 0:
            player.skip_turns -= 1
            print(f"{player.name} skips a turn.")
            return False
        self.board.display(self.players)
        print(f"{player.name} -- H:{player.health} M:{player.morality} S:{player.sanity} Items:{player.inventory}")
        action = input("Command (w/a/s/d, trade <item>): ").strip().lower()
        if action.startswith('trade'):
            parts = action.split(maxsplit=1)
            if len(parts) == 2:
                self.trade(player, parts[1])
            return False
        moves = {'w': (0, -1), 'a': (-1, 0), 's': (0, 1), 'd': (1, 0)}
        if action in moves:
            dx, dy = moves[action]
            if self.board.move_player(player, dx, dy):
                return self.handle_tile(player)
        else:
            print("Invalid command.")
        return False

    def play(self):
        print("--- Laughing in the Abyss ---")
        game_over = False
        while not game_over:
            for player in self.players:
                game_over = self.player_turn(player)
                if game_over:
                    break
        print("Game Over.")


if __name__ == '__main__':
    Game().play()
