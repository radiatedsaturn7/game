import random
import json
import re
import os
from dataclasses import dataclass, field
from typing import List, Callable, Optional, Iterable, Dict
import sys
from io import StringIO


class CaptureBuffer:
    """Capture printed text while still echoing to stdout."""

    def __enter__(self):
        self._stdout = sys.stdout
        self.buffer = StringIO()
        sys.stdout = self
        return self

    def write(self, text):
        self._stdout.write(text)
        self.buffer.write(text)

    def flush(self):
        self._stdout.flush()

    def __exit__(self, exc_type, exc, tb):
        sys.stdout = self._stdout

    def getvalue(self) -> str:
        return self.buffer.getvalue()


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


def print_encounter_text(card: 'EncounterCard'):
    """Display a stylized encounter description."""
    print(color(card.name, 'magenta'))
    print(card.description)


def print_location_text(location: 'LocationCard'):
    """Display a stylized location description."""
    print(color(location.name, 'cyan'))
    print(location.description)


def print_item_gain(item: 'Item'):
    """Show narrative when gaining an item."""
    print(color(f"You gained {item.name}", 'bold') + f" – {item.description}")
    if item.effect_text:
        print(f"Effect: {item.effect_text}")


def choose_numbered(
        
    option1: tuple[str, List[str]],
    option2: tuple[str, List[str]],
    game: Optional['Game'] = None,
    player: Optional['Player'] = None,
) -> str:
    """Present two numbered options with bullet details and return the choice.

    The prompt also accepts ``lookup <name>`` to view card or item details and
    ``use <item>`` to activate an item before deciding when a ``game`` and
    ``player`` are provided.
    """
    print("**Choose an option:**")
    print()
    print(f"**1)** {option1[0]}")
    for line in option1[1]:
        print(f"• {line}")
    print()
    print(f"**2)** {option2[0]}")
    for line in option2[1]:
        print(f"• {line}")
    print()
    while True:
        resp = input('Choose 1 or 2: ').strip().lower()
        if resp in ('1', '2'):
            return resp
        if resp.startswith('lookup') and game:
            query = resp[len('lookup'):].strip()
            if query:
                game.perform_lookup('auto', query)
            continue
        if resp.startswith('use') and game and player:
            item_name = resp[len('use'):].strip()
            if item_name:
                tile = game.board.tile_at(player.x, player.y)
                location = tile.location.name if tile.location else ''
                player.use_item(game, item_name, location)
            continue
        print("Invalid input. Type '1' or '2', or use 'lookup <name>' or 'use <item>'")


def data_encounter(card: 'EncounterCard', game: 'Game', player: 'Player'):
    """Generic encounter using structured choice data from the card."""

    def format_effect(eff: Dict[str, object]) -> str:
        parts: List[str] = []
        # Only include the description when no explicit values are present to
        # avoid duplicated text like "-2 Sanity; -2 Sanity".
        explicit = any(k in eff for k in ('Health', 'Sanity', 'Hope', 'Item'))
        text = eff.get('Description', '')
        if text and not explicit:
            parts.append(text)
        for key in ('Health', 'Sanity', 'Hope'):
            if key in eff:
                val = eff[key]
                sign = '+' if val >= 0 else ''
                parts.append(f"{sign}{val} {key}")
        item = eff.get('Item')
        if item:
            action = 'Gain' if eff.get('ItemAddOrRemove', 'add') != 'remove' else 'Lose'
            parts.append(f"{action} {item}")
        # If no explicit data was included, fall back to the description
        if not parts and text:
            parts.append(text)
        return '; '.join(parts)

    def build_lines(choice: Dict[str, object]) -> List[str]:
        lines: List[str] = []
        roll = choice.get('RollSuccess', 0)
        success = choice.get('Success', {})
        failure = choice.get('Failure', {})
        if roll and isinstance(roll, int) and roll > 0:
            lines.append('Roll **1d6**.')
            if success:
                lines.append(f"On **{roll}+**, {format_effect(success)}.")
            if failure:
                lines.append(f"Otherwise, {format_effect(failure)}.")
        else:
            if success:
                lines.append(format_effect(success))
        return lines

    options: List[tuple[str, List[str]]] = []
    for idx, ch in enumerate(card.choices, 1):
        text = ch.get('Text', '').strip()
        if not text:
            # Skip entries with no text to avoid confusing blank options
            continue
        options.append((text, build_lines(ch)))

    if not options:
        return

    if len(options) == 1:
        choice_idx = 0
        # display single option for confirmation
        title, lines = options[0]
        print(f"**{title}**")
        for line in lines:
            print(f"• {line}")
        confirm = input('Proceed? (y/n) ').strip().lower()
        if not confirm.startswith('y'):
            return
    else:
        prompts = [(title, lines) for title, lines in options[:2]]
        choice = choose_numbered(prompts[0], prompts[1], game, player)
        choice_idx = 0 if choice == '1' else 1

    chosen = card.choices[choice_idx]

    roll = chosen.get('RollSuccess', 0)
    success = chosen.get('Success', {})
    failure = chosen.get('Failure', {})

    if roll and isinstance(roll, int) and roll > 0:
        roll_val = player.roll_d6()
        if roll_val >= roll:
            game.apply_effect_dict(success, player)
        else:
            game.apply_effect_dict(failure, player)
    else:
        game.apply_effect_dict(success, player)


def final_data_encounter(card: 'FinalGateCard', game: 'Game', players: Iterable['Player']):
    """Group encounter for Final Gate cards using structured choice data."""

    def format_effect(eff: Dict[str, object]) -> str:
        parts: List[str] = []
        explicit = any(k in eff for k in ('Health', 'Sanity', 'Hope', 'Item'))
        text = eff.get('Description', '')
        if text and not explicit:
            parts.append(text)
        for key in ('Health', 'Sanity', 'Hope'):
            if key in eff:
                val = eff[key]
                sign = '+' if val >= 0 else ''
                parts.append(f"{sign}{val} {key}")
        item = eff.get('Item')
        if item:
            action = 'Gain' if eff.get('ItemAddOrRemove', 'add') != 'remove' else 'Lose'
            parts.append(f"{action} {item}")
        if not parts and text:
            parts.append(text)
        return '; '.join(parts)

    def build_lines(choice: Dict[str, object]) -> List[str]:
        lines: List[str] = []
        roll = choice.get('RollSuccess', 0)
        success = choice.get('Success', {})
        failure = choice.get('Failure', {})
        if roll and isinstance(roll, int) and roll > 0:
            lines.append('Roll **1d6**.')
            if success:
                lines.append(f"On **{roll}+**, {format_effect(success)}.")
            if failure:
                lines.append(f"Otherwise, {format_effect(failure)}.")
        else:
            if success:
                lines.append(format_effect(success))
        return lines

    options: List[tuple[str, List[str]]] = []
    for ch in card.choices:
        text = ch.get('Text', '').strip()
        if not text:
            continue
        options.append((text, build_lines(ch)))

    if not options:
        return

    if len(options) == 1:
        choice_idx = 0
        title, lines = options[0]
        print(f"**{title}**")
        for line in lines:
            print(f"• {line}")
        confirm = input('Proceed? (y/n) ').strip().lower()
        if not confirm.startswith('y'):
            return
    else:
        prompts = [(title, lines) for title, lines in options[:2]]
        first_player = next(iter(players))
        choice = choose_numbered(prompts[0], prompts[1], game, first_player)
        choice_idx = 0 if choice == '1' else 1

    chosen = card.choices[choice_idx]
    roll = chosen.get('RollSuccess', 0)
    success = chosen.get('Success', {})
    failure = chosen.get('Failure', {})

    for player in players:
        if roll and isinstance(roll, int) and roll > 0:
            roll_val = player.roll_d6()
            if roll_val >= roll:
                game.apply_effect_dict(success, player)
            else:
                game.apply_effect_dict(failure, player)
        else:
            game.apply_effect_dict(success, player)


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
    hope: int = 10
    sanity: int = 10
    inventory: List[Item] = field(default_factory=list)
    max_items: int = 2
    roll_bonus: int = 0
    sanity_shield: bool = False
    auto_succeed: bool = False
    auto_fail: bool = False
    loss_shield: bool = False
    reroll_next: bool = False
    double_next: bool = False
    cancel_digital_next: bool = False

    def apply_effect(
        self,
        game: 'Game',
        health: int = 0,
        hope: int = 0,
        sanity: int = 0,
        item: Optional[Item] = None,
    ):
        if self.loss_shield and (health < 0 or hope < 0 or sanity < 0):
            print('The Core of Something Real glows, preventing your losses.')
            if health < 0:
                health = 0
            if hope < 0:
                hope = 0
            if sanity < 0:
                sanity = 0
                if self.sanity_shield:
                    self.sanity_shield = False
            self.loss_shield = False
        self.health = max(0, min(10, self.health + health))
        if hope:
            game.modify_hope(hope)
        if sanity < 0 and self.sanity_shield:
            print('Your Frayed Neural Wire crackles and negates the sanity loss.')
            self.sanity_shield = False
        else:
            self.sanity = max(0, min(12, self.sanity + sanity))
        if item:
            self.add_item(item)

    def add_item(self, item: Item):
        if len(self.inventory) >= self.max_items:
            print(f"{self.name} cannot carry more items.")
            return False
        self.inventory.append(item)
        print_item_gain(item)
        return True

    def remove_item(self, item_name: str) -> bool:
        for i, it in enumerate(self.inventory):
            if it.name.lower() == item_name.lower():
                del self.inventory[i]
                return True
        return False

    def has_item(self, item_name: str) -> bool:
        return any(it.name.lower() == item_name.lower() for it in self.inventory)

    def use_item(self, game: 'Game', item_name: str, location: str):
        if item_name.lower() not in game.item_registry:
            print(f"Item '{item_name}' not found in your world.")
            return
        for i, it in enumerate(self.inventory):
            if it.name.lower() == item_name.lower():
                it.apply(game, self, location)
                del self.inventory[i]
                return
        print(f"{self.name} does not have {item_name}.")

    def roll_d6(self) -> int:
        roll = roll_d6()
        if self.roll_bonus != 0:
            roll = max(1, min(6, roll + self.roll_bonus))
            self.roll_bonus = 0
        print(f"{self.name} rolls {roll}")
        if self.reroll_next:
            use = input('Use Memory Token to reroll? (y/n) ').strip().lower()
            if use.startswith('y'):
                roll = roll_d6()
                print(f'{self.name} rerolls {roll}')
            self.reroll_next = False
        return roll

@dataclass
class EncounterCard:
    name: str
    description: str
    effect: Dict[str, object] = field(default_factory=dict)
    choices: List[Dict[str, object]] = field(default_factory=list)
    immediate: Optional[Callable[['Game', Player], None]] = None
    revisit: Optional[Callable[['Game', Player], None]] = None

    triggered: bool = False

    def apply(self, game: 'Game', player: Player, first_time: bool = True):
        if first_time:
            if player.auto_fail:
                print('You intentionally fail and move on.')
                player.auto_fail = False
                self.triggered = True
                return
            if player.auto_succeed:
                print('The Glimmer of What Could Be lets you skip this encounter.')
                player.auto_succeed = False
                self.triggered = True
                return
            if player.cancel_digital_next and any(k in self.name.lower() for k in ['digital', 'data', 'machine', 'socket']):
                print('Your Offline Token cancels this digital encounter.')
                player.cancel_digital_next = False
                self.triggered = True
                return
            times = 2 if player.double_next else 1
            if player.double_next:
                print('The encounter intensifies!')
                player.double_next = False
            print_encounter_text(self)
            for _ in range(times):
                if self.immediate:
                    self.immediate(game, player)
                if self.effect:
                    game.apply_effect_dict(self.effect, player)
            self.triggered = True
        else:
            if self.revisit:
                self.revisit(game, player)

    @property
    def short(self) -> str:
        title = self.name.replace('The ', '')
        return title.split()[0]


@dataclass
class LocationCard:
    name: str
    description: str
    effect_text: str = ''
    effect: Optional[Callable[['Game', Player], None]] = None

    def apply(self, game: 'Game', player: Player):
        print_location_text(self)
        if self.effect:
            self.effect(game, player)
        if self.effect_text:
            game.apply_effect_text(self.effect_text, player)

    @property
    def short(self) -> str:
        title = self.name.replace('The ', '')
        return title.split()[0]


@dataclass
class FinalGateCard:
    """Cards used during the Final Gate sequence."""
    name: str
    description: str
    choices: List[Dict[str, object]] = field(default_factory=list)
    effect: Optional[Callable[['Game', Iterable[Player]], None]] = None
    effect_text: str = ''

    def apply(self, game: 'Game', players: Iterable[Player]):
        if self.effect:
            self.effect(game, players)
        if self.effect_text:
            for p in players:
                game.apply_effect_text(self.effect_text, p)
        if self.choices:
            final_data_encounter(self, game, players)

def mirror_of_broken_memories(game: 'Game', player: Player):
    player.apply_effect(game, sanity=-1)

def whispering_wound(game: 'Game', player: Player):
    player.apply_effect(game, hope=-1)

def whispering_wound_revisit(game: 'Game', player: Player):
    if player.has_item('Muted Stone'):
        print('Your Muted Stone absorbs the whispers.')
    else:
        player.apply_effect(game, sanity=-1)

def laughing_statue(game: 'Game', player: Player):
    player.apply_effect(game, sanity=1)

def echo_well(game: 'Game', player: Player):
    player.apply_effect(game, hope=1)

def beneath_clockface(game: 'Game', player: Player):
    player.apply_effect(game, sanity=-1)

def revisit_minus_sanity(game: 'Game', player: Player):
    player.apply_effect(game, sanity=-1)

def revisit_plus_hope(game: 'Game', player: Player):
    player.apply_effect(game, hope=1)

# --- New Encounter Effects ---
def crooked_bell_first(game: 'Game', player: Player):
    if player.inventory:
        drop = input('Drop an item to gain 1 Hope? (y/n) ').strip().lower()
        if drop == 'y':
            lost = player.inventory.pop(0)
            print(f'You drop {lost.name}.')
            player.apply_effect(game, hope=1)
            return
    player.apply_effect(game, sanity=-1)

def crooked_bell_revisit(game: 'Game', player: Player):
    if not player.inventory:
        player.apply_effect(game, sanity=1)

def hungering_gate_first(game: 'Game', player: Player):
    if player.inventory:
        feed = input('Feed an item to the Gate? (y/n) ').strip().lower()
        if feed == 'y':
            lost = player.inventory.pop(0)
            print(f'The Gate devours {lost.name}.')
            return
    player.apply_effect(game, health=-2)

def hungering_gate_revisit(game: 'Game', player: Player):
    if player.health < 10:
        item = game.draw_item()
        if item:
            player.add_item(item)
            print(f'The Gate spits out {item.name}.')

def nameless_grave_first(game: 'Game', player: Player):
    player.apply_effect(game, hope=1, sanity=-1)

def nameless_grave_revisit(game: 'Game', player: Player):
    player.apply_effect(game, health=1, hope=-1)

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
        reg = game.item_registry.get(item_name.lower())
        if reg:
            other.add_item(Item(reg.name, reg.description, effect_text=reg.effect_text))
            print(f'Traded {item_name} with {other.name}.')
        else:
            print(f"Item '{item_name}' not found in your world.")

def bleeding_window_first(game: 'Game', player: Player):
    player.apply_effect(game, sanity=-1)
    stone = next((i for i in game.item_deck if i.name == 'Muted Stone'), None)
    if stone:
        game.item_deck.remove(stone)
        player.add_item(stone)
        print('You receive Muted Stone.')

def bleeding_window_revisit(game: 'Game', player: Player):
    choice = input('Trade Sanity for Hope (s) or Hope for Sanity (m)? ').strip().lower()
    if choice == 's':
        player.apply_effect(game, sanity=1, hope=-1)
    elif choice == 'm':
        player.apply_effect(game, hope=1, sanity=-1)

def mirror_of_versions(game: 'Game', player: Player):
    choice = choose_numbered(
        (
            'Confront them',
            [
                'Roll **1d6**.',
                'On a **6**, gain **+2 Sanity**.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        (
            'Smash the mirror',
            [
                'Lose **-1 Hope**.',
                "Gain **Shard of What Might've Been** — adds **+1 to one future roll**.",
            ],
        ),
        game,
        player,
    )
    if choice == '2':
        player.apply_effect(game, hope=-1)
        shard = game.item_registry.get("shard of what might've been")
        if shard:
            player.add_item(Item(shard.name, shard.description, effect_text=shard.effect_text, use_effect=shard.use_effect))
    else:
        roll = player.roll_d6()
        if roll == 6:
            player.apply_effect(game, sanity=2)
        else:
            player.apply_effect(game, sanity=-1)

def vending_machine(game: 'Game', player: Player):
    chips = game.item_registry.get('salted trauma chips')
    choice = choose_numbered(
        (
            'Use the machine',
            [
                'Lose **-1 Sanity**.',
                'Gain Salted Trauma Chips if available.',
            ],
        ),
        (
            'Kick it',
            [
                'Roll **1d6**.',
                'On **4+**, gain **+1 Sanity** and Salted Trauma Chips.',
                'Otherwise, lose **-2 Hope**.',
            ],
        ),
        game,
        player,
    )
    if choice == '2':
        roll = player.roll_d6()
        if roll >= 4:
            player.apply_effect(game, sanity=1)
            if chips:
                player.add_item(Item(chips.name, chips.description, effect_text=chips.effect_text, use_effect=chips.use_effect))
        else:
            print('The machine explodes!')
            game.modify_hope(-2)
    else:
        player.apply_effect(game, sanity=-1)
        if chips:
            player.add_item(Item(chips.name, chips.description, effect_text=chips.effect_text, use_effect=chips.use_effect))

def whispering_socket(game: 'Game', player: Player):
    wire = game.item_registry.get('frayed neural wire')
    choice = choose_numbered(
        (
            'Plug in',
            [
                'Roll **1d6**.',
                'On **6**, gain **+2 Hope**.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        (
            'Rip it out',
            [
                'Lose **-1 Hope**.',
                'Gain **Frayed Neural Wire**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll == 6:
            player.apply_effect(game, hope=2)
        else:
            player.apply_effect(game, sanity=-1)
    else:
        player.apply_effect(game, hope=-1)
        if wire:
            player.add_item(Item(wire.name, wire.description, effect_text=wire.effect_text, use_effect=wire.use_effect))

def pit_of_almosts(game: 'Game', player: Player):
    glim = game.item_registry.get('glimmer of what could be')
    choice = choose_numbered(
        (
            'Cross the pit',
            [
                'Roll **1d6**.',
                'On **5+**, gain **Glimmer of What Could Be**.',
                'Otherwise, lose **-2 Sanity**.',
            ],
        ),
        (
            'Take the long way',
            [
                'Lose **-1 Hope**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll >= 5:
            if glim:
                player.add_item(Item(glim.name, glim.description, effect_text=glim.effect_text, use_effect=glim.use_effect))
        else:
            player.apply_effect(game, sanity=-2)
    else:
        game.modify_hope(-1)

def unfinished_goodbyes(game: 'Game', player: Player):
    choice = choose_numbered(
        (
            'Open the letter',
            [
                'Roll **1d6**.',
                'On **5+**, gain **+1 Hope**.',
                'Otherwise, lose **-2 Sanity**.',
            ],
        ),
        (
            'Walk away',
            [
                'Lose **-1 Hope**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll >= 5:
            player.apply_effect(game, hope=1)
        else:
            player.apply_effect(game, sanity=-2)
    else:
        game.modify_hope(-1)

def bureaucratic_maw(game: 'Game', player: Player):
    stamp = game.item_registry.get('stamp of legitimacy')
    choice = choose_numbered(
        (
            'Fill it out',
            [
                'Lose **-1 Hope**.',
                'Gain **Stamp of Legitimacy**.',
            ],
        ),
        (
            'Burn it',
            [
                'Roll **1d6**.',
                'On **4+**, gain **+1 Sanity**.',
                'Otherwise, lose **-2 Hope**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        player.apply_effect(game, hope=-1)
        if stamp:
            player.add_item(Item(stamp.name, stamp.description, effect_text=stamp.effect_text, use_effect=stamp.use_effect))
    else:
        roll = player.roll_d6()
        if roll >= 4:
            player.apply_effect(game, sanity=1)
        else:
            game.modify_hope(-2)

def data_swamp(game: 'Game', player: Player):
    device = game.item_registry.get('distraction device')
    choice = choose_numbered(
        (
            'Scroll endlessly',
            [
                'Lose **-1 Sanity**.',
                'Gain Distraction Device if available.',
            ],
        ),
        (
            'Pull the plug',
            [
                'Roll **1d6**.',
                'On **4+**, gain **+2 Hope**.',
                'Otherwise, lose **-1 Sanity** and **-1 Hope**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        player.apply_effect(game, sanity=-1)
        if device:
            player.add_item(Item(device.name, device.description, effect_text=device.effect_text, use_effect=device.use_effect))
    else:
        roll = player.roll_d6()
        if roll >= 4:
            player.apply_effect(game, hope=2)
        else:
            player.apply_effect(game, sanity=-1)
            game.modify_hope(-1)

def flickering_exit_first(game: 'Game', player: Player):
    card = game.encounter_lookup.get('the flickering exit')
    choice = choose_numbered(
        (
            'Open it',
            [
                'Roll **1d6**.',
                '6: gain **+2 Hope** and pull the other player here.',
                '3-5: lose **-1 Sanity**.',
                '1-2: lose **-2 Sanity** and **-1 Hope**.',
            ],
        ),
        (
            'Ignore it',
            [
                'Gain **+1 Sanity**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll == 6:
            player.apply_effect(game, hope=2)
            others = [p for p in game.players if p != player]
            if others:
                other = others[0]
                other.x, other.y = player.x, player.y
                print(f'{other.name} is drawn through the exit!')
        elif 3 <= roll <= 5:
            player.apply_effect(game, sanity=-1)
        else:
            player.apply_effect(game, sanity=-2)
            game.modify_hope(-1)
    else:
        player.apply_effect(game, sanity=1)
        if card:
            card.revisit = lambda g, p: print('The exit flickers but will not open again.')

def crawlspace_unfinished(game: 'Game', player: Player):
    ashes = game.item_registry.get('ashes of ambition')
    choice = choose_numbered(
        (
            'Finish one',
            [
                'Roll **1d6**.',
                'On **5+**, gain **+1 Sanity**.',
                'Otherwise, lose **-2 Sanity**.',
            ],
        ),
        (
            'Burn it all',
            [
                'Lose **-1 Hope**.',
                'Gain **Ashes of Ambition**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll >= 5:
            player.apply_effect(game, sanity=1)
        else:
            player.apply_effect(game, sanity=-2)
    else:
        player.apply_effect(game, hope=-1)
        if ashes:
            player.add_item(Item(ashes.name, ashes.description, effect_text=ashes.effect_text, use_effect=ashes.use_effect))

def mouth_of_machine(game: 'Game', player: Player):
    core = game.item_registry.get('core of something real')
    choice = choose_numbered(
        (
            'Enter',
            [
                'Roll **1d6**.',
                'On **5+**, gain **Core of Something Real**.',
                'Otherwise, lose **-2 Sanity**.',
            ],
        ),
        (
            'Walk away',
            [
                'Lose **-1 Hope** and gain **+1 Sanity**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll >= 5:
            if core:
                player.add_item(Item(core.name, core.description, effect_text=core.effect_text, use_effect=core.use_effect))
        else:
            player.apply_effect(game, sanity=-2)
    else:
        player.apply_effect(game, hope=-1, sanity=1)

def library_lost_causes(game: 'Game', player: Player):
    choice = choose_numbered(
        (
            'Open a book',
            [
                'Roll **1d6**.',
                'On **6**, gain **+2 Sanity**.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        (
            'Leave them be',
            [
                'No effect.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll == 6:
            player.apply_effect(game, sanity=2)
        else:
            player.apply_effect(game, sanity=-1)

def looping_corridor(game: 'Game', player: Player):
    choice = choose_numbered(
        (
            'Break the loop',
            [
                'Lose **-2 Hope** and escape the loop.',
            ],
        ),
        (
            'Let it ride',
            [
                'Roll **1d6**.',
                'On **4+**, gain **+1 Hope**.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        game.modify_hope(-2)
        print('You break free from the endless walk.')
    else:
        roll = player.roll_d6()
        if roll >= 4:
            player.apply_effect(game, hope=1)
        else:
            player.apply_effect(game, sanity=-1)

def apology_room(game: 'Game', player: Player):
    echo = game.item_registry.get('echo of closure')
    choice = choose_numbered(
        (
            'Listen closely',
            [
                'Lose **-1 Sanity**.',
                'Gain **Echo of Closure**.',
            ],
        ),
        (
            'Yell back',
            [
                'Roll **1d6**.',
                'On **5+**, gain **+1 Sanity**.',
                'Otherwise, nothing happens.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        player.apply_effect(game, sanity=-1)
        if echo:
            player.add_item(Item(echo.name, echo.description, effect_text=echo.effect_text, use_effect=echo.use_effect))
    else:
        roll = player.roll_d6()
        if roll >= 5:
            player.apply_effect(game, sanity=1)

def room_you_forgot(game: 'Game', player: Player):
    card = game.encounter_lookup.get('the room you forgot')
    choice = choose_numbered(
        (
            'Try to remember',
            [
                'Roll **1d6**.',
                'On **6**, gain **+1 Hope**.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        (
            'Ignore it',
            [
                'If encountered again, lose **-1 Hope**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll == 6:
            player.apply_effect(game, hope=1)
        else:
            player.apply_effect(game, sanity=-1)
    else:
        if card:
            def revisit(g, p):
                p.apply_effect(g, hope=-1)
            card.revisit = revisit

def plaza_forgotten_names(game: 'Game', player: Player):
    choice = input('Choose a new name (n) or keep yours (k)? ').strip().lower()
    tag = game.item_registry.get('blank tag')
    if choice.startswith('n'):
        player.apply_effect(game, hope=-1)
        if tag:
            player.add_item(Item(tag.name, tag.description, effect_text=tag.effect_text, use_effect=tag.use_effect))
    else:
        player.apply_effect(game, sanity=1)

def graveyard_yesterdays(game: 'Game', player: Player):
    token = game.item_registry.get('memory token')
    choice = choose_numbered(
        (
            'Mourn one',
            [
                'Lose **-1 Hope**.',
                'Gain **Memory Token**.',
            ],
        ),
        (
            'Bury one',
            [
                'Roll **1d6**.',
                'On **5+**, gain **+1 Sanity**.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        player.apply_effect(game, hope=-1)
        if token:
            player.add_item(Item(token.name, token.description, effect_text=token.effect_text, use_effect=token.use_effect))
    else:
        roll = player.roll_d6()
        if roll >= 5:
            player.apply_effect(game, sanity=1)
        else:
            player.apply_effect(game, sanity=-1)

def elevator_down(game: 'Game', player: Player):
    key = game.item_registry.get('rusty override key')
    choice = choose_numbered(
        (
            'Ride it',
            [
                'Roll **1d6**.',
                'On **6**, gain **+2 Sanity**.',
                'Otherwise, lose **-1 Sanity** and **-1 Hope**.',
            ],
        ),
        (
            'Take the stairs',
            [
                'Lose **-1 Sanity**.',
                'Gain **Rusty Override Key** if available.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll == 6:
            player.apply_effect(game, sanity=2)
        else:
            player.apply_effect(game, sanity=-1)
            game.modify_hope(-1)
    else:
        player.apply_effect(game, sanity=-1)
        if key:
            player.add_item(Item(key.name, key.description, effect_text=key.effect_text, use_effect=key.use_effect))

def silent_ward(game: 'Game', player: Player):
    choice = input('Wait (w) or move past (m)? ').strip().lower()
    if choice.startswith('w'):
        game.modify_hope(-1)
    else:
        player.apply_effect(game, sanity=1)
        player.double_next = True

def hall_digital_ghosts(game: 'Game', player: Player):
    token = game.item_registry.get('offline token')
    choice = choose_numbered(
        (
            'Read messages',
            [
                'Roll **1d6**.',
                'On **5+**, gain **+1 Hope**.',
                'Otherwise, lose **-2 Sanity**.',
            ],
        ),
        (
            'Log off',
            [
                'Lose **-1 Hope**.',
                'Gain **Offline Token** if available.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll >= 5:
            player.apply_effect(game, hope=1)
        else:
            player.apply_effect(game, sanity=-2)
    else:
        player.apply_effect(game, hope=-1)
        if token:
            player.add_item(Item(token.name, token.description, effect_text=token.effect_text, use_effect=token.use_effect))

def fork_in_the_real(game: 'Game', player: Player):
    choice = input('Split paths (s) or burn your path (b)? ').strip().lower()
    if choice.startswith('s'):
        game.modify_hope(1)
        game.no_reunite = True
        print('Your paths diverge; you may not reunite until fate shifts.')
    else:
        game.modify_hope(-1)

def snackless_breakroom(game: 'Game', player: Player):
    snack = game.item_registry.get('comfort snack')
    choice = choose_numbered(
        (
            'Check the fridge',
            [
                'Roll **1d6**.',
                'On **6**, gain **Comfort Snack**.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        (
            'Walk away',
            [
                'Gain **+1 Hope**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll == 6 and snack:
            player.add_item(Item(snack.name, snack.description, effect_text=snack.effect_text, use_effect=snack.use_effect))
        else:
            player.apply_effect(game, sanity=-1)
    else:
        game.modify_hope(1)

def discarded_room(game: 'Game', player: Player):
    choice = choose_numbered(
        (
            'Claim it',
            [
                'Gain **+1 Sanity** and suffer **-1 to next roll**.',
            ],
        ),
        (
            'Reject it',
            [
                'Roll **1d6**.',
                'On **5+**, nothing happens.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        player.apply_effect(game, sanity=1)
        player.roll_bonus -= 1
    else:
        roll = player.roll_d6()
        if roll >= 5:
            print('Nothing gained, nothing lost.')
        else:
            player.apply_effect(game, sanity=-1)

def applause_trap(game: 'Game', player: Player):
    choice = input('Take a bow (b) or walk away (w)? ').strip().lower()
    if choice.startswith('b'):
        player.apply_effect(game, hope=1, sanity=-1)
    else:
        player.apply_effect(game, hope=-1, sanity=1)

def compromise_engine(game: 'Game', player: Player):
    choice = input('Insert memory (i) or decline (d)? ').strip().lower()
    bolt = game.item_registry.get('rusty refusal bolt')
    if choice.startswith('i'):
        player.apply_effect(game, sanity=-2)
        game.modify_hope(2)
    else:
        if bolt:
            player.add_item(Item(bolt.name, bolt.description, effect_text=bolt.effect_text, use_effect=bolt.use_effect))

def void_restroom(game: 'Game', player: Player):
    choice = choose_numbered(
        (
            'Use the stall',
            [
                'Roll **1d6**.',
                'On **4+**, gain **+1 Sanity**.',
                'Otherwise, lose **-1 Hope**.',
            ],
        ),
        (
            'Hold it',
            [
                'Lose **-1 Sanity**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll >= 4:
            player.apply_effect(game, sanity=1)
        else:
            game.modify_hope(-1)
    else:
        player.apply_effect(game, sanity=-1)

def room_no_door(game: 'Game', player: Player):
    sketch = game.item_registry.get('exit sketch')
    choice = choose_numbered(
        (
            'Wait',
            [
                'Lose **-1 Hope**.',
                'Gain **Exit Sketch** if available.',
            ],
        ),
        (
            'Panic',
            [
                'Roll **1d6**.',
                'On **5+**, gain **+1 Hope**.',
                'Otherwise, lose **-2 Sanity**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        game.modify_hope(-1)
        if sketch:
            player.add_item(Item(sketch.name, sketch.description, effect_text=sketch.effect_text, use_effect=sketch.use_effect))
    else:
        roll = player.roll_d6()
        if roll >= 5:
            game.modify_hope(1)
        else:
            player.apply_effect(game, sanity=-2)

def archive_everything(game: 'Game', player: Player):
    ash = game.item_registry.get('ashen archive')
    choice = choose_numbered(
        (
            'Browse the stacks',
            [
                'Roll **1d6**.',
                'On **5+**, gain **+1 Sanity**.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        (
            'Burn it all',
            [
                'Lose **-2 Hope**.',
                'Gain **Ashen Archive** if available.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll >= 5:
            player.apply_effect(game, sanity=1)
        else:
            player.apply_effect(game, sanity=-1)
    else:
        game.modify_hope(-2)
        if ash:
            player.add_item(Item(ash.name, ash.description, effect_text=ash.effect_text, use_effect=ash.use_effect))

def inherited_guilt(game: 'Game', player: Player):
    token = game.item_registry.get('burden token')
    choice = choose_numbered(
        (
            'Shoulder it',
            [
                'Lose **-2 Sanity**.',
                'Gain **Burden Token**.',
            ],
        ),
        (
            'Refuse',
            [
                'Roll **1d6**.',
                'On **1-3**, lose **-1 Hope**.',
                'Otherwise, nothing happens.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        player.apply_effect(game, sanity=-2)
        if token:
            player.add_item(Item(token.name, token.description, effect_text=token.effect_text, use_effect=token.use_effect))
    else:
        roll = player.roll_d6()
        if roll < 4:
            game.modify_hope(-1)

def flickering_choir(game: 'Game', player: Player):
    choice = choose_numbered(
        (
            'Sing back',
            [
                'Roll **1d6**.',
                'On **6**, gain **+2 Sanity**.',
                'Otherwise, lose **-1 Sanity**.',
            ],
        ),
        (
            'Cover ears',
            [
                'Lose **-1 Hope** and gain **+1 Sanity**.',
            ],
        ),
        game,
        player,
    )
    if choice == '1':
        roll = player.roll_d6()
        if roll == 6:
            player.apply_effect(game, sanity=2)
        else:
            player.apply_effect(game, sanity=-1)
    else:
        player.apply_effect(game, hope=-1, sanity=1)

# ----- Final Gate encounter effects -----
def abyssal_laugh(game: 'Game', players: Iterable[Player]):
    print('Unseen voices laugh from the darkness...')
    for p in players:
        roll = p.roll_d6()
        if roll <= 3:
            p.apply_effect(game, sanity=-1)
            print(f'{p.name} loses 1 Sanity.')
        else:
            p.apply_effect(game, sanity=1)
            print(f'{p.name} steels themselves and gains 1 Sanity.')


def weighing_sins(game: 'Game', players: Iterable[Player]):
    for p in players:
        choice = input(f'{p.name}: lose 2 Health (h) or 1 Hope (m)? ').strip().lower()
        if choice == 'h':
            p.apply_effect(game, health=-2)
        else:
            p.apply_effect(game, hope=-1)


def glimpse_of_light(game: 'Game', players: Iterable[Player]):
    print('A warm light cuts through the gloom, if only for a moment.')
    for p in players:
        p.apply_effect(game, sanity=1, hope=1)

# ----- Item Use Effects -----
def use_echo_stone(game: 'Game', player: Player, location: str) -> bool:
    """Reveal an unrevealed tile adjacent to either player."""
    candidates = []
    for p in game.players:
        for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            x, y = p.x + dx, p.y + dy
            if game.board.in_bounds(x, y):
                tile = game.board.tile_at(x, y)
                if not tile.revealed and (x, y) not in candidates:
                    candidates.append((x, y))
    if not candidates:
        print('No adjacent unrevealed tiles to reveal.')
        return True
    print('Choose a tile to reveal:')
    for idx, (x, y) in enumerate(candidates, 1):
        print(f' {idx}. ({x},{y})')
    choice = input('Select number: ').strip()
    if choice.isdigit() and 1 <= int(choice) <= len(candidates):
        x, y = candidates[int(choice) - 1]
        game.reveal_tile(x, y)
    else:
        print('Cancelled.')
    return True


def use_tearshard(game: 'Game', player: Player, location: str) -> bool:
    """Reveal any unrevealed tile on the board."""
    coords = []
    for x in range(game.board.size):
        for y in range(game.board.size):
            tile = game.board.tile_at(x, y)
            if not tile.revealed:
                coords.append((x, y))
    if not coords:
        print('All tiles are already revealed.')
        return True
    print('Choose a tile to reveal:')
    for idx, (x, y) in enumerate(coords, 1):
        print(f' {idx}. ({x},{y})')
    choice = input('Select number: ').strip()
    if choice.isdigit() and 1 <= int(choice) <= len(coords):
        x, y = coords[int(choice) - 1]
        game.reveal_tile(x, y)
    else:
        print('Cancelled.')
    return True

def use_shard(game: 'Game', player: Player, location: str) -> bool:
    player.roll_bonus += 1
    print('The shard glints. Your next roll gets +1.')
    return True

def use_chips(game: 'Game', player: Player, location: str) -> bool:
    player.apply_effect(game, sanity=1)
    return True

def use_neural_wire(game: 'Game', player: Player, location: str) -> bool:
    player.sanity_shield = True
    print('The wire hums, ready to absorb sanity loss.')
    return True

def use_glimmer(game: 'Game', player: Player, location: str) -> bool:
    player.auto_succeed = True
    print('A glimmer surrounds you. Your next encounter will be skipped.')
    return True

def use_stamp(game: 'Game', player: Player, location: str) -> bool:
    print('The stamp impresses invisible authority around you.')
    return True

def use_distraction(game: 'Game', player: Player, location: str) -> bool:
    player.auto_succeed = True
    print('You activate the distraction device to skip the next encounter.')
    return True

def use_ashes(game: 'Game', player: Player, location: str) -> bool:
    player.auto_succeed = True
    print('Ashes swirl, letting you skip your next encounter.')
    return True

def use_core(game: 'Game', player: Player, location: str) -> bool:
    player.loss_shield = True
    print('Reality solidifies around you, guarding against loss.')
    return True

def use_echo_closure(game: 'Game', player: Player, location: str) -> bool:
    player.apply_effect(game, sanity=2)
    return True

def use_blank_tag(game: 'Game', player: Player, location: str) -> bool:
    player.auto_succeed = True
    print('With a new name, you may skip your next encounter.')
    return True

def use_memory_token(game: 'Game', player: Player, location: str) -> bool:
    player.reroll_next = True
    print('You focus on a memory, ready to reroll the next die.')
    return True

def use_override_key(game: 'Game', player: Player, location: str) -> bool:
    coords = []
    for x in range(game.board.size):
        for y in range(game.board.size):
            tile = game.board.tile_at(x, y)
            if tile.revealed:
                coords.append((x, y))
    if not coords or not game.deck:
        print('Nothing happens.')
        return True
    print('Choose a revealed tile to replace:')
    for idx, (x, y) in enumerate(coords, 1):
        print(f' {idx}. ({x},{y})')
    choice = input('Select number: ').strip()
    if choice.isdigit() and 1 <= int(choice) <= len(coords):
        x, y = coords[int(choice) - 1]
        tile = game.board.tile_at(x, y)
        tile.encounter = game.draw_encounter()
        tile.location = None
        print('The tile shifts to something new.')
    else:
        print('Cancelled.')
    return True

def use_offline(game: 'Game', player: Player, location: str) -> bool:
    player.cancel_digital_next = True
    print('You ready the Offline Token to cancel a digital encounter.')
    return True

def use_comfort_snack(game: 'Game', player: Player, location: str) -> bool:
    player.apply_effect(game, sanity=1)
    return True

def use_refusal_bolt(game: 'Game', player: Player, location: str) -> bool:
    player.auto_fail = True
    print('You load the bolt, ready to purposely fail the next encounter.')
    return True

def use_exit_sketch(game: 'Game', player: Player, location: str) -> bool:
    coords = []
    for x in range(game.board.size):
        for y in range(game.board.size):
            tile = game.board.tile_at(x, y)
            if tile.revealed:
                coords.append((x, y))
    if not coords:
        print('No revealed tiles to sketch an exit to.')
        return True
    print('Choose a revealed tile to move to:')
    for idx, (x, y) in enumerate(coords, 1):
        print(f' {idx}. ({x},{y})')
    choice = input('Select number: ').strip()
    if choice.isdigit() and 1 <= int(choice) <= len(coords):
        player.x, player.y = coords[int(choice) - 1]
        print('You step through your sketched doorway.')
    else:
        print('Cancelled.')
    return True

def use_ashen_archive(game: 'Game', player: Player, location: str) -> bool:
    player.auto_succeed = True
    print('Past failures fuel your next success.')
    return True

def use_burden_token(game: 'Game', player: Player, location: str) -> bool:
    other = next(p for p in game.players if p != player)
    other.loss_shield = True
    print(f'{other.name} is protected from their next loss.')
    return True

class Tile:
    def __init__(self):
        self.revealed = False
        self.encounter: Optional[EncounterCard] = None
        self.location: Optional[LocationCard] = None

class Board:
    def __init__(self, size: int = 5):
        self.size = size
        self.grid = [[Tile() for _ in range(size)] for _ in range(size)]
        # load location data
        with open('locations.json') as f:
            locs = {row['Name']: row for row in json.load(f)}

        start = locs.get('The Fractured Vestibule', {'Description': 'Start'})
        gate = locs.get('The Final Gate', {'Description': 'Exit'})

        # randomly place the Fractured Vestibule each game
        self.start_pos = (
            random.randint(0, size - 1),
            random.randint(0, size - 1),
        )
        start_tile = self.grid[self.start_pos[0]][self.start_pos[1]]
        start_tile.location = LocationCard(
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

        self.grid[self.final_pos[0]][self.final_pos[1]].location = LocationCard(
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

    def display_lines(self, players: List[Player], location_lookup: Dict[str, Dict[str, str]], width: int = 15) -> List[str]:
        lines: List[str] = []
        border = '+' + '+'.join('-' * width for _ in range(self.size)) + '+'
        lines.append(border)
        for y in range(self.size):
            row = '|'
            for x in range(self.size):
                tile = self.grid[x][y]
                players_here = [p for p in players if p.x == x and p.y == y]
                color_code = ''
                if players_here:
                    cell = 'Both' if len(players_here) == 2 else players_here[0].name
                else:
                    if not tile.revealed:
                        cell = '???'
                    else:
                        names = []
                        if tile.location:
                            names.append(tile.location.name)
                            lookup = location_lookup.get(tile.location.name.lower(), {})
                            effect = lookup.get('Effect', '')
                            if effect:
                                eff = effect.lower()
                                if any(tok in eff for tok in ['+1', '+2', '+3', 'gain', 'restore']):
                                    color_code = 'green'
                                if any(tok in eff for tok in ['-1', '-2', '-3', 'lose']):
                                    color_code = 'red'
                        if tile.encounter:
                            names.append(tile.encounter.name)
                        cell = '/'.join(names)
                cell = shorten_name(cell, width)
                if color_code:
                    cell = color(cell, color_code)
                row += cell.center(width) + '|'
            lines.append(row)
            lines.append(border)
        return lines

class Game:
    def __init__(self, hope: int = 10):
        self.encounter_lookup: Dict[str, EncounterCard] = {}
        self.item_registry: Dict[str, Item] = {}
        self.location_lookup: Dict[str, Dict[str, str]] = {}
        self.board = Board()
        self.players = [
            Player('Robtergeist', 'R'),
            Player('Cait Vex', 'C')
        ]
        self.hope = max(0, min(12, hope))
        self.last_action_summary: str = 'Welcome to the Abyss.'
        self.last_action_description: str = ''
        self.load_locations()
        self.deck = self.create_deck()
        self.item_deck = self.create_item_deck()
        self.final_deck = self.create_final_deck()
        random.shuffle(self.deck)
        self.discovered_log: List[str] = []
        self.no_reunite: bool = False

        # Both players begin at the Fractured Vestibule
        start_x, start_y = self.board.start_pos
        for p in self.players:
            p.x, p.y = start_x, start_y
            p.hope = self.hope

        for p in self.players:
            tile = self.board.tile_at(p.x, p.y)
            tile.revealed = True
            if tile.location and f"[{p.x},{p.y}] - {tile.location.name} (Location)" not in self.discovered_log:
                self.discovered_log.append(f"[{p.x},{p.y}] - {tile.location.name} (Location)")

    def modify_hope(self, amount: int):
        """Adjust shared Hope and sync with players."""
        self.hope = max(0, min(12, self.hope + amount))
        for p in self.players:
            p.hope = self.hope

    def load_locations(self):
        with open('locations.json') as f:
            for row in json.load(f):
                self.location_lookup[row['Name'].lower()] = row

    def create_deck(self) -> List[EncounterCard]:
        deck: List[EncounterCard] = []
        with open('cards.json') as f:
            for row in json.load(f):
                card = EncounterCard(
                    name=row['Name'],
                    description=row['Description'],
                    effect=row.get('Effect', {}),
                    choices=row.get('Choices', [])
                )
                # Attach scripted effects when available
                mapping = {
                    'the flickering exit': {'immediate': flickering_exit_first},
                    'the room you forgot': {'immediate': room_you_forgot},
                    'the plaza of forgotten names': {'immediate': plaza_forgotten_names},
                    'the silent ward': {'immediate': silent_ward},
                    'fork in the real': {'immediate': fork_in_the_real},
                    'the discarded room': {'immediate': discarded_room},
                    'the compromise engine': {'immediate': compromise_engine},
                    'mirror of broken memories': {'immediate': mirror_of_broken_memories},
                    'the whispering wound': {'immediate': whispering_wound, 'revisit': whispering_wound_revisit},
                    'the crooked bell': {'immediate': crooked_bell_first, 'revisit': crooked_bell_revisit},
                    'the hungering gate': {'immediate': hungering_gate_first, 'revisit': hungering_gate_revisit},
                    'the nameless grave': {'immediate': nameless_grave_first, 'revisit': nameless_grave_revisit},
                    'shiverglass lake': {'immediate': shiverglass_lake_first, 'revisit': shiverglass_lake_revisit},
                    'the bleeding window': {'immediate': bleeding_window_first, 'revisit': bleeding_window_revisit},
                    'the laughing statue': {'immediate': laughing_statue},
                    'echo well': {'immediate': echo_well},
                    'beneath the clockface': {'immediate': beneath_clockface},
                }
                key = card.name.lower()
                if key in mapping:
                    info = mapping[key]
                    card.immediate = info.get('immediate')
                    card.revisit = info.get('revisit')
                if not card.immediate and card.choices:
                    card.immediate = lambda g, p, c=card: data_encounter(c, g, p)
                deck.append(card)
                self.encounter_lookup[card.name.lower()] = card
        random.shuffle(deck)
        final_card = EncounterCard(
            name='Final Threshold',
            description="A black door hums with power. Your name is etched above it—twice. The void speaks: 'One walks. One stays.'",
        )
        insert_at = max(0, len(deck) - random.randint(3, 5))
        deck.insert(insert_at, final_card)
        return deck

    def create_item_deck(self) -> List[Item]:
        items: List[Item] = []
        with open('items.json') as f:
            for row in json.load(f):
                item = Item(row['Name'], row['Description'], effect_text=row['Effect'])
                # Assign special use effects by item name
                if item.name == 'Echo Stone':
                    item.use_effect = use_echo_stone
                if item.name == 'Tearshard':
                    item.use_effect = use_tearshard
                if item.name == "Shard of What Might've Been":
                    item.use_effect = use_shard
                if item.name == 'Salted Trauma Chips':
                    item.use_effect = use_chips
                if item.name == 'Frayed Neural Wire':
                    item.use_effect = use_neural_wire
                if item.name == 'Glimmer of What Could Be':
                    item.use_effect = use_glimmer
                if item.name == 'Stamp of Legitimacy':
                    item.use_effect = use_stamp
                if item.name == 'Distraction Device':
                    item.use_effect = use_distraction
                if item.name == 'Ashes of Ambition':
                    item.use_effect = use_ashes
                if item.name == 'Core of Something Real':
                    item.use_effect = use_core
                if item.name == 'Echo of Closure':
                    item.use_effect = use_echo_closure
                if item.name == 'Blank Tag':
                    item.use_effect = use_blank_tag
                if item.name == 'Memory Token':
                    item.use_effect = use_memory_token
                if item.name == 'Rusty Override Key':
                    item.use_effect = use_override_key
                if item.name == 'Offline Token':
                    item.use_effect = use_offline
                if item.name == 'Comfort Snack':
                    item.use_effect = use_comfort_snack
                if item.name == 'Rusty Refusal Bolt':
                    item.use_effect = use_refusal_bolt
                if item.name == 'Exit Sketch':
                    item.use_effect = use_exit_sketch
                if item.name == 'Ashen Archive':
                    item.use_effect = use_ashen_archive
                if item.name == 'Burden Token':
                    item.use_effect = use_burden_token
                # store a copy for the deck
                items.append(Item(item.name, item.description, effect_text=item.effect_text, use_effect=item.use_effect))
                self.item_registry[item.name.lower()] = item
        random.shuffle(items)
        return items

    def create_final_deck(self) -> List[FinalGateCard]:
        deck: List[FinalGateCard] = []
        with open('final_encounters.json') as f:
            for row in json.load(f):
                deck.append(
                    FinalGateCard(
                        name=row['Name'],
                        description=row['Description'],
                        choices=row.get('Choices', []),
                        effect_text=row.get('Effect', '')
                    )
                )
        random.shuffle(deck)
        return deck

    def draw_item(self) -> Optional[Item]:
        if not self.item_deck:
            return None
        return self.item_deck.pop()

    def draw_encounter(self) -> EncounterCard:
        if not self.deck:
            return EncounterCard('Empty Expanse', 'Nothing happens here.', immediate=lambda g, p: None)
        return self.deck.pop()

    def process_card(self, name: str, player: Player, first_time: bool = True):
        """Lookup an encounter by name and resolve it."""
        card = self.encounter_lookup.get(name.lower())
        if not card:
            print(f"Encounter '{name}' not found.")
            return
        card.apply(self, player, first_time)

    def apply_effect_text(self, text: str, player: Player):
        if not text:
            return
        print(f"Effect: {text}")
        lower = text.lower()
        for match in re.findall(r'([+-]?\d+)\s*(health|sanity|hope)', lower):
            val = int(match[0])
            attr = match[1]
            if attr == 'health':
                player.apply_effect(self, health=val)
            elif attr == 'sanity':
                player.apply_effect(self, sanity=val)
            elif attr == 'hope':
                player.apply_effect(self, hope=val)
        for match in re.findall(r'gain(?: item)?[: ]+([^,(.]+)', lower):
            name = re.sub(r'\(.*?\)', '', match).strip()
            name = re.sub(r'\b(?:a|an|the)\b\s*', '', name, flags=re.I)
            if not name or name[0].isdigit() or name[0] in '+-':
                continue
            name = name.title()
            reg = self.item_registry.get(name.lower())
            if reg:
                player.add_item(Item(reg.name, reg.description, effect_text=reg.effect_text))
        # Reveal tile instructions
        reveal_adjacent = re.search(r'reveal (?:a|one|1) (?:nearby|adjacent) tile', lower)
        if reveal_adjacent:
            print('A nearby tile is revealed...')
            self.reveal_adjacent_tiles(player)
        else:
            m = re.search(r'reveal (\d+) tile', lower)
            if m:
                count = int(m.group(1))
                self.reveal_random_tiles(count)
            elif 'reveal a tile' in lower or 'reveal 1 tile' in lower:
                self.reveal_random_tiles(1)
        if 'lose 1 item' in lower or 'discard one item' in lower:
            if player.inventory:
                lost = player.inventory.pop(0)
                print(f'{player.name} loses {lost.name}')

    def apply_effect_dict(self, effect: Dict[str, object], player: Player):
        if not effect:
            return
        desc = effect.get('Description', '')
        if desc:
            print(desc)
        player.apply_effect(
            self,
            health=effect.get('Health', 0),
            hope=effect.get('Hope', 0),
            sanity=effect.get('Sanity', 0),
        )
        item = effect.get('Item')
        if item:
            reg = self.item_registry.get(item.lower())
            if reg:
                if effect.get('ItemAddOrRemove', 'add') == 'remove':
                    player.remove_item(reg.name)
                else:
                    player.add_item(Item(reg.name, reg.description, effect_text=reg.effect_text, use_effect=reg.use_effect))

    def format_effect_short(self, effect: Dict[str, object]) -> str:
        parts: List[str] = []
        for key in ('Health', 'Sanity', 'Hope'):
            if key in effect:
                val = effect[key]
                sign = '+' if val >= 0 else ''
                parts.append(f"{sign}{val} {key}")
        if 'Item' in effect:
            action = 'Gain' if effect.get('ItemAddOrRemove', 'add') != 'remove' else 'Lose'
            parts.append(f"{action} {effect['Item']}")
        return '; '.join(parts)

    def run_final_gate(self) -> bool:
        random.shuffle(self.final_deck)
        trials = self.final_deck[:3]
        print('--- Final Gate Trials ---')
        for card in trials:
            print(f'[{card.name}] {card.description}')
            card.apply(self, self.players)
            for p in self.players:
                if p.health <= 0 or p.sanity <= 0 or self.hope <= 0:
                    print(f'{p.name} could not withstand the final trial...')
                    return True
        print('You have overcome the final trials and escape the Abyss!')
        return True

    def run_final_threshold(self) -> bool:
        print('You stand at the Final Threshold.')
        choice = input('Sacrifice one player to let the other escape? (y/n) ').strip().lower()
        if choice == 'y':
            names = '/'.join(p.name for p in self.players)
            victim = input(f'Who will be sacrificed? ({names}) ').strip().lower()
            for p in self.players:
                if p.name.lower().startswith(victim):
                    print(f'{p.name} is lost to the Abyss. The other escapes!')
                    return True
        success = True
        for p in self.players:
            roll = p.roll_d6()
            if roll < 5:
                success = False
        if success:
            print('Both players escape together!')
        else:
            print('The Abyss claims you both...')
        return True

    def generate_summary(
        self,
        player: Player,
        action: str,
        encounter_name: str,
        first_encounter: bool,
        location_name: str,
        stat_changes: List[str],
        item_changes: List[str],
    ) -> str:
        """Create a single line summary describing the player's action."""
        parts = [f"{player.name} moved {action}"]
        if encounter_name:
            if first_encounter:
                parts.append(f"and encountered {encounter_name}")
            else:
                parts.append(f"and revisited {encounter_name}")
        if location_name:
            parts.append(f"at {location_name}")
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
        for line in self.board.display_lines(self.players, self.location_lookup):
            print(line)

    def show_discovered_locations(self):
        found = False
        print('Discovered Locations:')
        for x in range(self.board.size):
            for y in range(self.board.size):
                tile = self.board.grid[x][y]
                if tile.revealed:
                    found = True
                    if tile.location:
                        loc = tile.location
                        info = self.location_lookup.get(loc.name.lower(), {})
                        desc = info.get('Description', loc.description)
                        effect = info.get('Effect', loc.effect_text)
                        line = f"[{x},{y}] - {loc.name}: {desc}"
                        if effect:
                            line += f" | Effect: {effect}"
                        print(line)
                    if tile.encounter:
                        enc = tile.encounter
                        line = f"[{x},{y}] - {enc.name}: {enc.description}"
                        if enc.effect:
                            eff = self.format_effect_short(enc.effect)
                            if eff:
                                line += f" | Effect: {eff}"
                        print(line)
        if not found:
            print('None yet.')

    def format_stats(self, player: Player, inv_width: int = 10) -> str:
        items = ', '.join(shorten_name(it.name, inv_width) for it in player.inventory)
        if not items:
            items = 'None'
        return (
            f"{player.name} – Sanity: {player.sanity} | "
            f"Items: [{items}]"
        )

    def render_screen(self, active_player: Player) -> str:
        os.system('cls' if os.name == 'nt' else 'clear')
        board_lines = self.board.display_lines(self.players, self.location_lookup)
        width = len(board_lines[0])
        left = self.format_stats(self.players[0])
        right = self.format_stats(self.players[1])
        buffer: List[str] = []

        # Horizontal bar
        buffer.append('-' * width)

        # Narrative summary block
        if self.last_action_summary:
            buffer.append(self.last_action_summary)
        if self.last_action_description:
            buffer.append(self.last_action_description.rstrip())
        if self.last_action_summary or self.last_action_description:
            buffer.append('')
        buffer.append('-' * width)

        # Player stats stacked for readability
        buffer.append(left.ljust(width))
        buffer.append(right.ljust(width))
        buffer.append(f"Hope: {self.hope}".ljust(width))
        buffer.append('')

        # Game board
        buffer.extend(board_lines)
        buffer.append('')

        # Command options
        buffer.append('Commands: w/a/s/d, rest, use, trade, pass, end, items <player>, discovered, lookup <name>')
        buffer.append('')

        # Prompt
        buffer.append(f"{active_player.name}'s move:")
        print('\n'.join(buffer))
        return input('> ').strip().lower()

    def perform_lookup(self, category: str, name: str):
        key = name.lower()
        if category in ('any', 'auto'):
            if key in self.item_registry:
                self.perform_lookup('item', name)
                return
            if key in self.encounter_lookup:
                self.perform_lookup('encounter', name)
                return
            if key in self.location_lookup:
                self.perform_lookup('location', name)
                return
            print('Nothing found with that name.')
            return
        if category == 'item':
            item = self.item_registry.get(key)
            if item:
                print(color(f"\U0001F4D8 ITEM: {item.name}", 'bold'))
                print(f"{item.description}")
                if item.effect_text:
                    print(f"Effect: {item.effect_text}")
                return
        elif category in ('encounter', 'card'):
            card = self.encounter_lookup.get(key)
            if card:
                print(color(f"\U0001F4DC ENCOUNTER: {card.name}", 'bold'))
                print(card.description)
                if card.effect:
                    eff = self.format_effect_short(card.effect)
                    if eff:
                        print(f"Effect: {eff}")
                return
        elif category == 'location':
            loc = self.location_lookup.get(key)
            if loc:
                print(color(f"\U0001F4D6 LOCATION: {loc['Name']}", 'bold'))
                print(loc['Description'])
                if loc.get('Effect'):
                    print(f"Effect: {loc['Effect']}")
                return
        if category == 'item':
            print(f"Item '{name}' not found in your world.")
        else:
            print('Nothing found with that name.')
        if category == 'item':
            names = sorted(self.item_registry.keys())
        elif category in ('encounter', 'card'):
            names = sorted(self.encounter_lookup.keys())
        elif category == 'location':
            names = sorted(self.location_lookup.keys())
        else:
            names = []
        if names:
            print('Available options:')
            for n in names:
                print(f' - {n}')


    def handle_tile(self, player: Player, direction: str) -> (bool, str):
        tile = self.board.tile_at(player.x, player.y)
        first_time = not tile.revealed
        if first_time:
            tile.revealed = True
            if tile.encounter is None:
                tile.encounter = self.draw_encounter()
            if tile.encounter:
                entry = f"[{player.x},{player.y}] - {tile.encounter.name} (Encounter)"
                self.discovered_log.append(entry)
            if tile.location:
                entry = f"[{player.x},{player.y}] - {tile.location.name} (Location)"
                if entry not in self.discovered_log:
                    self.discovered_log.append(entry)
            self.modify_hope(-1)

        before = (player.health, player.sanity, self.hope)
        before_items = [it.name for it in player.inventory]

        enc_first = False
        with CaptureBuffer() as cap:
            if tile.encounter and not tile.encounter.triggered:
                enc_first = True
                tile.encounter.apply(self, player, True)
            elif tile.encounter and tile.encounter.revisit:
                tile.encounter.apply(self, player, False)

            if tile.location:
                tile.location.apply(self, player)
            self.check_item_triggers(player, tile)
        self.last_action_description = cap.getvalue().strip()

        after = (player.health, player.sanity, self.hope)
        after_items = [it.name for it in player.inventory]

        stat_changes = []
        labels = ['Health', 'Sanity', 'Hope']
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

        encounter_name = tile.encounter.name if tile.encounter else ''
        location_name = tile.location.name if tile.location else ''
        summary = self.generate_summary(player, direction, encounter_name, enc_first, location_name, stat_changes, item_changes)

        if encounter_name == 'Final Threshold' and enc_first:
            game_over = self.run_final_threshold()
            return game_over, summary

        if tile.location and tile.location.name == 'Final Gate':
            if all(p.x == player.x and p.y == player.y and p.sanity >= 3 for p in self.players) and self.hope >= 3:
                game_over = self.run_final_gate()
                return game_over, summary

        if player.health == 0 or player.sanity == 0 or self.hope == 0:
            print(f"{player.name} has fallen in the Abyss...")
            return True, summary
        return False, summary

    def reveal_tile(self, x: int, y: int):
        """Reveal a tile without moving a player."""
        if not self.board.in_bounds(x, y):
            print('That tile is outside the Abyss.')
            return
        tile = self.board.tile_at(x, y)
        if tile.revealed:
            print('Tile already revealed.')
            return
        tile.revealed = True
        if tile.encounter is None:
            tile.encounter = self.draw_encounter()
        if tile.location:
            entry = f"[{x},{y}] - {tile.location.name} (Location)"
            if entry not in self.discovered_log:
                self.discovered_log.append(entry)
        if tile.encounter:
            entry = f"[{x},{y}] - {tile.encounter.name} (Encounter)"
            if entry not in self.discovered_log:
                self.discovered_log.append(entry)
        if tile.location:
            print_location_text(tile.location)
        if tile.encounter:
            print_encounter_text(tile.encounter)

    def reveal_adjacent_tiles(self, player: Player, count: int = 1):
        """Reveal up to 'count' unrevealed tiles adjacent to the player."""
        for _ in range(count):
            options = []
            for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                nx, ny = player.x + dx, player.y + dy
                if self.board.in_bounds(nx, ny):
                    tile = self.board.tile_at(nx, ny)
                    if not tile.revealed:
                        options.append((nx, ny))
            if not options:
                return
            x, y = random.choice(options)
            self.reveal_tile(x, y)

    def reveal_random_tiles(self, count: int = 1):
        """Reveal up to 'count' random unrevealed tiles anywhere."""
        coords = [
            (x, y)
            for x in range(self.board.size)
            for y in range(self.board.size)
            if not self.board.tile_at(x, y).revealed
        ]
        random.shuffle(coords)
        for x, y in coords[:count]:
            self.reveal_tile(x, y)

    def check_item_triggers(self, player: Player, tile: Tile):
        """Apply automatic item effects based on the current tile."""
        mask = next((it for it in player.inventory if it.name == 'Splintered Mask'), None)
        if mask:
            keywords = ['stage', 'choir', 'rehearsal', 'puppet', 'performance']
            names = []
            if tile.location:
                names.append(tile.location.name.lower())
            if tile.encounter:
                names.append(tile.encounter.name.lower())
            if any(any(k in n for k in keywords) for n in names):
                print('The Splintered Mask hums with forgotten applause.')
                player.apply_effect(game, hope=1)

    def trade(self, from_player: Player, to_player: Player, item_name: str):
        if from_player.x != to_player.x or from_player.y != to_player.y:
            print("Both players must be on the same tile to trade.")
            return
        for i, it in enumerate(from_player.inventory):
            if it.name.lower() == item_name.lower():
                from_player.inventory.pop(i)
                to_player.inventory.append(it)
                print(f"{from_player.name} gave {it.name} to {to_player.name}.")
                return
        print(f"{from_player.name} does not have {item_name}.")

    def select_item(self, player: Player) -> Optional[str]:
        if not player.inventory:
            print(f"{player.name} has no items.")
            return None
        while True:
            print(f"{player.name}'s items:")
            for idx, it in enumerate(player.inventory, 1):
                print(f" {idx}. {it.name}")
            choice = input('Choose item number (0 to cancel): ').strip()
            if choice in ('0', ''):
                return None
            if choice.isdigit() and 1 <= int(choice) <= len(player.inventory):
                return player.inventory[int(choice) - 1].name
            print('Invalid choice.')


    def player_turn(self, player: Player, can_move: bool = True) -> bool:
        while True:
            action = self.render_screen(player)
            if action.startswith('items'):
                parts = action.split(maxsplit=1)
                name = parts[1] if len(parts) == 2 else player.name
                target = next((p for p in self.players if p.name.lower() == name.lower()), None)
                if target:
                    if target.inventory:
                        print(f"{target.name} has: " + ', '.join(it.name for it in target.inventory))
                    else:
                        print(f"{target.name} has no items.")
                else:
                    print('Unknown player.')
                continue
            if action.startswith('discovered'):
                self.show_discovered_locations()
                continue
            if action.startswith('lookup'):
                parts = action.split(maxsplit=2)
                if len(parts) >= 2:
                    if len(parts) >= 3 and parts[1] in ('encounter', 'item', 'location', 'card'):
                        self.perform_lookup(parts[1], parts[2])
                    else:
                        query = action[len('lookup'):].strip()
                        self.perform_lookup('auto', query)
                else:
                    print('Usage: lookup <name>')
                continue
            if action in ('help', 'commands'):
                print('Commands: w/a/s/d, rest, use, trade, pass, end, items <player>, discovered, lookup <name>')
                continue
            if action == 'pass':
                if not can_move:
                    return False
                other = self.players[1] if player == self.players[0] else self.players[0]
                self.last_action_summary = f"{player.name} passed to {other.name}."
                self.player_turn(other, False)
                continue
            if action.startswith('trade'):
                other = self.players[1] if player == self.players[0] else self.players[0]
                parts = action.split(maxsplit=1)
                if len(parts) == 2 and parts[1]:
                    item_name = parts[1]
                else:
                    item_name = self.select_item(player)
                if item_name:
                    self.trade(player, other, item_name)
                    self.last_action_summary = f"{player.name} gave {item_name} to {other.name}."
                continue
            if action.startswith('use'):
                parts = action.split(maxsplit=1)
                if len(parts) == 2 and parts[1]:
                    item_name = parts[1]
                else:
                    item_name = self.select_item(player)
                if item_name:
                    tile = self.board.tile_at(player.x, player.y)
                    name = tile.location.name if tile.location else ''
                    player.use_item(self, item_name, name)
                    self.last_action_summary = f"{player.name} used {item_name}."
                continue
            if action == 'rest':
                player.apply_effect(self, sanity=1)
                self.modify_hope(-1)
                self.last_action_summary = f"{player.name} rested."
                return self.hope == 0
            if action == 'end':
                if not can_move:
                    print('You cannot end during a pass. Type "pass" to return.')
                    continue
                self.last_action_summary = f"{player.name} ended their turn."
                return False
            moves = {'w': (0,-1), 'a': (-1,0), 's': (0,1), 'd': (1,0)}
            if action in moves:
                if not can_move:
                    print('You cannot move right now.')
                    continue
                dx, dy = moves[action]
                if self.no_reunite:
                    other = self.players[1] if player == self.players[0] else self.players[0]
                    if other.x == player.x + dx and other.y == player.y + dy:
                        print('A force keeps you apart for now.')
                        continue
                if self.board.move_player(player, dx, dy):
                    dir_word = {'w': 'up', 'a': 'left', 's': 'down', 'd': 'right'}[action]
                    game_over, summary = self.handle_tile(player, dir_word)
                    self.last_action_summary = summary
                    return game_over
                self.last_action_summary = f"{player.name} cannot move that way."
                return False
            print('Invalid action.')
            continue

    def play(self):
        print('--- Laughing in the Abyss ---')
        game_over = False
        active = 0
        while not game_over:
            player = self.players[active]
            game_over = self.player_turn(player)
            active = 1 - active

if __name__ == '__main__':
    Game().play()
