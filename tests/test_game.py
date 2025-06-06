import sys, os; sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
import json
import unittest
from unittest.mock import patch
import random
import main
from main import Item

# Ensure this test passes for all cards before submitting a pull request.

class DummyInput:
    def __call__(self, prompt=''):
        return '1'

dummy_input = DummyInput()

class CardTests(unittest.TestCase):
    def setUp(self):
        random.seed(0)

    def _new_game(self):
        return main.Game()

    def test_encounter_cards(self):
        for name in json_names('cards.json'):
            for roll in (6, 0):
                game = self._new_game()
                player = game.players[0]
                card = game.encounter_lookup[name.lower()]
                with patch('builtins.input', dummy_input), \
                     patch.object(player, 'roll_d6', return_value=roll):
                    card.apply(game, player, True)

    def test_location_cards(self):
        game = self._new_game()
        player = game.players[0]
        for row in game.location_lookup.values():
            loc = main.LocationCard(row['Name'], row['Description'], row['Effect'])
            with patch('builtins.input', dummy_input):
                loc.apply(game, player)

    def test_item_cards(self):
        game = self._new_game()
        player = game.players[0]
        for item in game.item_registry.values():
            with patch('builtins.input', dummy_input):
                item.apply(game, player, '')

    def test_final_encounters(self):
        game = self._new_game()
        for card in game.final_deck:
            with patch('builtins.input', dummy_input):
                card.apply(game, game.players)

    def test_loss_conditions(self):
        # Health zero
        game = self._new_game()
        player = game.players[0]
        player.health = 0
        with patch('builtins.input', dummy_input):
            over, _ = game.handle_tile(player, 'down')
        self.assertTrue(over)

        # Sanity zero
        game = self._new_game()
        player = game.players[0]
        player.sanity = 0
        with patch('builtins.input', dummy_input):
            over, _ = game.handle_tile(player, 'down')
        self.assertTrue(over)

        # Hope zero
        game = self._new_game()
        player = game.players[0]
        game.hope = 0
        for p in game.players:
            p.hope = 0
        with patch('builtins.input', dummy_input):
            over, _ = game.handle_tile(player, 'down')
        self.assertTrue(over)

    def test_single_choice_item_gain(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the apology room']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Echo of Closure'))

    def test_lookup_with_space_during_move(self):
        game = self._new_game()
        player = game.players[0]
        actions = iter(['look up salted trauma chips', 'end'])

        def fake_input(prompt=''):
            return next(actions)

        with patch('builtins.input', fake_input), patch('os.system', lambda *_: None), main.CaptureBuffer() as cap:
            game.player_turn(player)
        self.assertIn('ITEM: Salted Trauma Chips', cap.getvalue())

    def test_oracle_wick_cancels_effect(self):
        game = self._new_game()
        player = game.players[0]
        wick = game.item_registry['oracle wick']
        player.add_item(wick)
        player.use_item(game, 'oracle wick', '')
        game.apply_effect_dict({'Description': 'hit', 'Health': -2}, player)
        self.assertEqual(player.health, 10)

    def test_core_recovers_lost_item(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the casket of kindness']
        core = game.item_registry['core of something real']
        tag = game.item_registry['blank tag']
        player.add_item(Item(tag.name, tag.description, effect_text=tag.effect_text, use_effect=tag.use_effect))
        player.add_item(Item(core.name, core.description, effect_text=core.effect_text, use_effect=core.use_effect))
        card.apply(game, player, True)
        self.assertFalse(player.has_item('Blank Tag'))
        player.use_item(game, 'core of something real', '')
        self.assertTrue(player.has_item('Blank Tag'))
        self.assertFalse(player.has_item('Core of Something Real'))

    def test_lookup_immediate_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'fork in the real')
        self.assertIn('cannot share a tile', cap.getvalue().lower())

    def test_lookup_silent_ward_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the silent ward')
        self.assertIn('wait: -1 hope', cap.getvalue().lower())

    def test_description_parses_missing_stats(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the corridor of crooked steps']
        card.apply(game, player, True)
        self.assertEqual(game.hope, 11)
        self.assertEqual(player.health, 9)


def json_names(filename):
    import json
    with open(filename) as f:
        data = json.load(f)
    return [row['Name'] for row in data]

if __name__ == '__main__':
    unittest.main()
