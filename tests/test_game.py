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

    def test_apology_room_listen(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the apology room']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Echo of Closure'))
        self.assertEqual(player.sanity, 9)

    def test_apology_room_yell_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the apology room']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)
        self.assertFalse(player.has_item('Echo of Closure'))

    def test_apology_room_yell_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the apology room']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=3):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 10)
        self.assertFalse(player.has_item('Echo of Closure'))

    def test_room_you_forgot_remember_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the room you forgot']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 11)
        self.assertEqual(player.sanity, 10)

    def test_room_you_forgot_remember_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the room you forgot']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)

    def test_room_you_forgot_ignore_revisit(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the room you forgot']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 10)
        card.apply(game, player, False)
        self.assertEqual(game.hope, 9)

    def test_lookup_with_space_during_move(self):
        game = self._new_game()
        player = game.players[0]
        actions = iter(['look up salted trauma chips', '', 'end'])

        def fake_input(prompt=''):
            return next(actions)

        with patch('builtins.input', fake_input), patch('os.system', lambda *_: None), main.CaptureBuffer() as cap:
            game.player_turn(player)
        self.assertIn('ITEM: Salted Trauma Chips', cap.getvalue())

    def test_items_command_self(self):
        game = self._new_game()
        player = game.players[0]
        actions = iter(['items', '', 'end'])

        def fake_input(prompt=''):
            return next(actions)

        with patch('builtins.input', fake_input), patch('os.system', lambda *_: None), main.CaptureBuffer() as cap:
            game.player_turn(player)
        self.assertIn('has no items', cap.getvalue())

    def test_items_command_other_partial_name(self):
        game = self._new_game()
        player = game.players[0]
        actions = iter(['items cait', '', 'end'])

        def fake_input(prompt=''):
            return next(actions)

        with patch('builtins.input', fake_input), patch('os.system', lambda *_: None), main.CaptureBuffer() as cap:
            game.player_turn(player)
        self.assertIn('Cait Vex has no items', cap.getvalue())

    def test_memory_token_reroll_prompt_allows_lookup(self):
        game = self._new_game()
        player = game.players[0]
        token = game.item_registry['memory token']
        crown = game.item_registry['wax crown']
        player.add_item(Item(token.name, token.description, effect_text=token.effect_text, use_effect=token.use_effect))
        player.add_item(Item(crown.name, crown.description, effect_text=crown.effect_text, use_effect=crown.use_effect))
        player.use_item(game, 'memory token', '')
        inputs = iter(['lookup wax crown', 'n'])

        def fake_input(prompt=''):
            return next(inputs)

        with patch('builtins.input', fake_input), main.CaptureBuffer() as cap:
            player.roll_d6(game)
        self.assertIn('ITEM: Wax Crown', cap.getvalue())

    def test_confirm_prompt_allows_items(self):
        game = self._new_game()
        player = game.players[0]
        token = game.item_registry['memory token']
        player.add_item(Item(token.name, token.description, effect_text=token.effect_text, use_effect=token.use_effect))
        player.use_item(game, 'memory token', '')
        inputs = iter(['items', 'n'])

        def fake_input(prompt=''):
            return next(inputs)

        with patch('builtins.input', fake_input), main.CaptureBuffer() as cap:
            player.roll_d6(game)
        self.assertIn('Robtergeist has no items', cap.getvalue())

    def test_choose_numbered_allows_items(self):
        game = self._new_game()
        player = game.players[0]
        inputs = iter(['items', '1'])

        def fake_input(prompt=''):
            return next(inputs)

        with patch('builtins.input', fake_input), main.CaptureBuffer() as cap:
            choice = main.choose_numbered(('Do it', []), ('Walk away', []), game, player)
        self.assertEqual(choice, '1')
        self.assertIn('Robtergeist has no items', cap.getvalue())

    def test_oracle_wick_cancels_effect(self):
        game = self._new_game()
        player = game.players[0]
        wick = game.item_registry['oracle wick']
        player.add_item(wick)
        player.use_item(game, 'oracle wick', '')
        game.apply_effect_dict({'Description': 'hit', 'Health': -2}, player)
        self.assertEqual(player.sanity, 10)

    def test_oracle_wick_cancels_modify_hope(self):
        game = self._new_game()
        player = game.players[0]
        wick = game.item_registry['oracle wick']
        player.add_item(wick)
        player.use_item(game, 'oracle wick', '')
        game.modify_hope(-2)
        self.assertEqual(game.hope, 10)

    def test_oracle_wick_cancels_item_loss(self):
        game = self._new_game()
        player = game.players[0]
        wick = game.item_registry['oracle wick']
        tag = game.item_registry['blank tag']
        player.add_item(Item(tag.name, tag.description, effect_text=tag.effect_text, use_effect=tag.use_effect))
        player.add_item(wick)
        player.use_item(game, 'oracle wick', '')
        lost = player.lose_item()
        self.assertIsNone(lost)
        self.assertTrue(player.has_item('Blank Tag'))

    def test_husk_mask_skips_next_tile(self):
        game = self._new_game()
        player = game.players[0]
        mask = game.item_registry['husk mask']
        player.add_item(Item(mask.name, mask.description, effect_text=mask.effect_text, use_effect=mask.use_effect))
        player.use_item(game, 'husk mask', '')
        # Prepare a predictable encounter
        card = main.EncounterCard('Test Card', 'desc', effect={'Description': '-1 Sanity', 'Sanity': -1})
        game.board.move_player(player, 1, 0)
        tile = game.board.tile_at(player.x, player.y)
        tile.encounter = card
        with patch('builtins.input', dummy_input):
            game.handle_tile(player, 'right')
        self.assertEqual(player.sanity, 10)
        self.assertEqual(game.hope, 9)

    def test_signal_crown_resists_encounter(self):
        game = self._new_game()
        player = game.players[0]
        crown = game.item_registry['signal crown']
        player.add_item(Item(crown.name, crown.description, effect_text=crown.effect_text, use_effect=crown.use_effect))
        player.use_item(game, 'signal crown', '')
        card = main.EncounterCard('Test Card', 'desc', effect={'Description': '-1 Sanity', 'Sanity': -1})
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 10)

    def test_weeping_ledger_effect(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the weeping ledger']
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)
        self.assertEqual(game.hope, 11)

    def test_glass_colossus_awards_tearshard(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the glass colossus']
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)
        self.assertTrue(player.has_item('Tearshard'))

    def test_chain_that_whispers_effect(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the chain that whispers']
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)
        self.assertTrue(player.has_item('Whisper Link'))

    def test_whisper_link_moves_cait(self):
        game = self._new_game()
        player = game.players[0]
        cait = game.players[1]
        link = game.item_registry['whisper link']
        player.add_item(Item(link.name, link.description, effect_text=link.effect_text, use_effect=link.use_effect))
        player.x, player.y = 0, 0
        cait.x, cait.y = 0, 2
        player.use_item(game, 'whisper link', '')
        self.assertEqual((cait.x, cait.y), (0, 1))

    def test_binding_thread_pulls_other(self):
        game = self._new_game()
        player = game.players[0]
        other = game.players[1]
        thread = game.item_registry['binding thread']
        player.add_item(Item(thread.name, thread.description, effect_text=thread.effect_text, use_effect=thread.use_effect))
        player.x, player.y = 1, 1
        other.x, other.y = 1, 3
        player.use_item(game, 'binding thread', '')
        self.assertEqual((other.x, other.y), (player.x, player.y))
        self.assertFalse(player.has_item('Binding Thread'))

    def test_binding_thread_blocked_by_compass(self):
        game = self._new_game()
        player = game.players[0]
        other = game.players[1]
        thread = game.item_registry['binding thread']
        compass = game.item_registry['worn compass']
        player.add_item(Item(thread.name, thread.description, effect_text=thread.effect_text, use_effect=thread.use_effect))
        other.add_item(Item(compass.name, compass.description, effect_text=compass.effect_text, use_effect=compass.use_effect))
        other.use_item(game, 'worn compass', '')
        player.x, player.y = 0, 0
        other.x, other.y = 0, 2
        player.use_item(game, 'binding thread', '')
        self.assertNotEqual((other.x, other.y), (player.x, player.y))

    def test_signal_flare_reveals_tile(self):
        game = self._new_game()
        player = game.players[0]
        flare = game.item_registry['signal flare']
        player.add_item(Item(flare.name, flare.description, effect_text=flare.effect_text, use_effect=flare.use_effect))
        player.x, player.y = 2, 2
        before = sum(1 for x in range(game.board.size) for y in range(game.board.size) if game.board.tile_at(x, y).revealed)
        with patch('builtins.input', lambda prompt='': '1'):
            player.use_item(game, 'signal flare', '')
        after = sum(1 for x in range(game.board.size) for y in range(game.board.size) if game.board.tile_at(x, y).revealed)
        self.assertEqual(after, before + 1)
        self.assertFalse(player.has_item('Signal Flare'))

    def test_abyssal_flask_use(self):
        game = self._new_game()
        player = game.players[0]
        flask = game.item_registry['abyssal flask']
        player.add_item(Item(flask.name, flask.description, effect_text=flask.effect_text, use_effect=flask.use_effect))
        start_sanity = player.sanity
        start_hope = game.hope
        player.use_item(game, 'abyssal flask', '')
        self.assertEqual(player.sanity, start_sanity + 2)
        self.assertEqual(game.hope, start_hope - 1)
        self.assertFalse(player.has_item('Abyssal Flask'))

    def test_red_circuit_bonus(self):
        game = self._new_game()
        player = game.players[0]
        circuit = game.item_registry['red circuit']
        player.add_item(Item(circuit.name, circuit.description, effect_text=circuit.effect_text, use_effect=circuit.use_effect))
        player.use_item(game, 'red circuit', '')
        with patch('main.roll_d6', return_value=3):
            roll = player.roll_d6(game)
        self.assertEqual(roll, 4)
        self.assertFalse(player.has_item('Red Circuit'))

    def test_mirror_shard_sets_reroll(self):
        game = self._new_game()
        player = game.players[0]
        shard = game.item_registry['mirror shard']
        player.add_item(Item(shard.name, shard.description, effect_text=shard.effect_text, use_effect=shard.use_effect))
        player.use_item(game, 'mirror shard', '')
        self.assertTrue(player.reroll_next)

    def test_fragmented_doll_before_final(self):
        game = self._new_game()
        player = game.players[0]
        doll = game.item_registry['fragmented doll']
        player.add_item(Item(doll.name, doll.description, effect_text=doll.effect_text, use_effect=doll.use_effect))
        start_hope = game.hope
        player.use_item(game, 'fragmented doll', '')
        self.assertEqual(game.hope, start_hope + 1)
        self.assertFalse(player.has_item('Fragmented Doll'))

    def test_fragmented_doll_after_final_no_bonus(self):
        game = self._new_game()
        player = game.players[0]
        doll = game.item_registry['fragmented doll']
        player.add_item(Item(doll.name, doll.description, effect_text=doll.effect_text, use_effect=doll.use_effect))
        game.final_encounter_started = True
        start_hope = game.hope
        player.use_item(game, 'fragmented doll', '')
        self.assertEqual(game.hope, start_hope)
        self.assertFalse(player.has_item('Fragmented Doll'))

    def test_coded_key_unlocks_tile(self):
        game = self._new_game()
        player = game.players[0]
        key = game.item_registry['coded key']
        player.add_item(Item(key.name, key.description, effect_text=key.effect_text, use_effect=key.use_effect))
        tile = game.board.tile_at(1, 1)
        tile.locked = True
        player.use_item(game, 'coded key', '')
        self.assertFalse(tile.locked)
        self.assertFalse(player.has_item('Coded Key'))

    def test_coded_key_rerolls_shift(self):
        game = self._new_game()
        player = game.players[0]
        key = game.item_registry['coded key']
        player.add_item(Item(key.name, key.description, effect_text=key.effect_text, use_effect=key.use_effect))
        player.use_item(game, 'coded key', '')
        with patch.object(player, 'roll_d6', side_effect=[1, 6]):
            game.abyssal_shift()
        self.assertEqual(player.sanity, 10)
        self.assertFalse(player.reroll_shift)

    def test_lantern_maw_effect(self):
        game = self._new_game()
        player = game.players[0]
        extra = game.item_registry['blank tag']
        player.add_item(Item(extra.name, extra.description, effect_text=extra.effect_text, use_effect=extra.use_effect))
        inv_before = len(player.inventory)
        card = game.encounter_lookup['the lantern maw']
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertEqual(len(player.inventory), inv_before - 1)
        self.assertEqual(game.hope, 11)
        self.assertEqual(player.sanity, 11)

    def test_dagger_in_the_cradle_effect(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['dagger in the cradle']
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)
        self.assertTrue(player.has_item('Singing Blade'))

    def test_rustbone_choir_effect(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the rustbone choir']
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 8)
        self.assertEqual(game.hope, 12)

    def test_tower_of_the_forgotten_signal_reveals_tiles(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['tower of the forgotten signal']
        before = sum(
            1
            for x in range(game.board.size)
            for y in range(game.board.size)
            if game.board.tile_at(x, y).revealed
        )
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        after = sum(
            1
            for x in range(game.board.size)
            for y in range(game.board.size)
            if game.board.tile_at(x, y).revealed
        )
        self.assertEqual(after - before, 3)

    def test_wax_crown_added_and_toggle(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['throne of melted faces']
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Wax Crown'))
        start_hope = player.hope
        start_sanity = player.sanity
        player.use_item(game, 'wax crown', '')
        self.assertTrue(player.wearing_wax_crown)
        self.assertEqual(player.hope, start_hope + 1)
        self.assertEqual(player.sanity, start_sanity - 1)
        self.assertTrue(player.has_item('Wax Crown'))
        player.use_item(game, 'wax crown', '')
        self.assertFalse(player.wearing_wax_crown)
        self.assertEqual(player.hope, start_hope)
        self.assertEqual(player.sanity, start_sanity)
        self.assertTrue(player.has_item('Wax Crown'))

    def test_vending_machine_use_machine(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the vending machine of moral compromise']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Salted Trauma Chips'))
        self.assertEqual(player.sanity, 9)

    def test_data_swamp_scroll(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the data swamp']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Distraction Device'))
        self.assertEqual(player.sanity, 9)

    def test_data_swamp_pull_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the data swamp']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 12)

    def test_data_swamp_pull_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the data swamp']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)
        self.assertEqual(game.hope, 9)

    def test_graveyard_mourn(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the graveyard of yesterdays']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Memory Token'))
        self.assertEqual(game.hope, 9)

    def test_graveyard_bury_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the graveyard of yesterdays']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)

    def test_graveyard_bury_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the graveyard of yesterdays']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)

    def test_elevator_ride_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the elevator that only goes down']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 12)

    def test_elevator_ride_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the elevator that only goes down']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=3):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)
        self.assertEqual(game.hope, 9)

    def test_elevator_take_stairs(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the elevator that only goes down']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)
        self.assertTrue(player.has_item('Rusty Override Key'))

    def test_plaza_new_name(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the plaza of forgotten names']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Blank Tag'))
        self.assertEqual(game.hope, 9)

    def test_plaza_keep_yours(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the plaza of forgotten names']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)

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

    def test_library_open_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the library of lost causes']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 12)

    def test_library_open_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the library of lost causes']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)

    def test_library_leave_be(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the library of lost causes']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 10)

    def test_looping_corridor_break(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the looping corridor']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 8)

    def test_looping_corridor_ride_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the looping corridor']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 11)

    def test_looping_corridor_ride_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the looping corridor']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)

    def test_flickering_exit_open_jackpot(self):
        game = self._new_game()
        player = game.players[0]
        other = game.players[1]
        card = game.encounter_lookup['the flickering exit']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 12)
        self.assertEqual(other.x, player.x)
        self.assertEqual(other.y, player.y)

    def test_worn_compass_blocks_flicker_pull(self):
        game = self._new_game()
        player = game.players[0]
        other = game.players[1]
        compass = game.item_registry['worn compass']
        other.add_item(Item(compass.name, compass.description, effect_text=compass.effect_text, use_effect=compass.use_effect))
        other.use_item(game, 'worn compass', '')
        player.x, player.y = 0, 0
        other.x, other.y = 2, 2
        card = game.encounter_lookup['the flickering exit']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertNotEqual((other.x, other.y), (player.x, player.y))

    def test_flickering_exit_open_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the flickering exit']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=1):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 8)
        self.assertEqual(game.hope, 9)

    def test_flickering_exit_ignore(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the flickering exit']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)

    def test_mouth_of_machine_enter_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the mouth of the machine']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Core of Something Real'))
        self.assertEqual(player.sanity, 10)

    def test_mouth_of_machine_enter_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the mouth of the machine']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertFalse(player.has_item('Core of Something Real'))
        self.assertEqual(player.sanity, 8)

    def test_mouth_of_machine_walk_away(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the mouth of the machine']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)
        self.assertEqual(player.sanity, 11)

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

    def test_silent_ward_wait(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the silent ward']
        with patch('builtins.input', lambda prompt='': 'w'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)
        self.assertEqual(player.sanity, 10)
        self.assertFalse(player.double_next)

    def test_silent_ward_move_past(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the silent ward']
        with patch('builtins.input', lambda prompt='': 'm'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)
        self.assertTrue(player.double_next)

    def test_hall_digital_ghosts_read_messages_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the hall of digital ghosts']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 11)

    def test_hall_digital_ghosts_read_messages_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the hall of digital ghosts']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 8)

    def test_hall_digital_ghosts_log_off(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the hall of digital ghosts']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)
        self.assertTrue(player.has_item('Offline Token'))

    def test_fork_real_split(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['fork in the real']
        with patch('builtins.input', lambda prompt='': 's'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 11)
        self.assertTrue(game.no_reunite)

    def test_fork_real_burn(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['fork in the real']
        with patch('builtins.input', lambda prompt='': 'b'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)
        self.assertFalse(game.no_reunite)

    def test_snackless_breakroom_check_fridge_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the snackless breakroom']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Comfort Snack'))
        self.assertEqual(player.sanity, 10)

    def test_snackless_breakroom_check_fridge_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the snackless breakroom']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=3):
            card.apply(game, player, True)
        self.assertFalse(player.has_item('Comfort Snack'))
        self.assertEqual(player.sanity, 9)

    def test_snackless_breakroom_walk_away(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the snackless breakroom']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 11)

    def test_discarded_room_claim_it(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the discarded room']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)
        self.assertEqual(player.roll_bonus, -1)

    def test_discarded_room_reject_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the discarded room']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 10)
        self.assertEqual(player.roll_bonus, 0)

    def test_discarded_room_reject_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the discarded room']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=3):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)
        self.assertEqual(player.roll_bonus, 0)

    def test_applause_trap_bow(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the applause trap']
        with patch('builtins.input', lambda prompt='': 'b'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 11)
        self.assertEqual(player.sanity, 9)

    def test_applause_trap_walk(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the applause trap']
        with patch('builtins.input', lambda prompt='': 'w'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)
        self.assertEqual(player.sanity, 11)

    def test_compromise_engine_insert_memory(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the compromise engine']
        with patch('builtins.input', lambda prompt='': 'i'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 12)
        self.assertEqual(player.sanity, 8)

    def test_compromise_engine_decline(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the compromise engine']
        with patch('builtins.input', lambda prompt='': 'd'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Rusty Refusal Bolt'))
        self.assertEqual(game.hope, 10)
        self.assertEqual(player.sanity, 10)

    def test_void_restroom_use_stall_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the void restroom']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)

    def test_void_restroom_use_stall_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the void restroom']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)

    def test_void_restroom_hold_it(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the void restroom']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)

    def test_room_no_door_wait(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the room with no door']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Exit Sketch'))
        self.assertEqual(game.hope, 9)

    def test_room_no_door_panic_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the room with no door']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 11)

    def test_room_no_door_panic_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the room with no door']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=3):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 8)

    def test_archive_browse_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the archive of everything that didn\u2019t work']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)

    def test_archive_browse_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the archive of everything that didn\u2019t work']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)

    def test_archive_burn_it_all(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the archive of everything that didn\u2019t work']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 8)
        self.assertTrue(player.has_item('Ashen Archive'))

    def test_inherited_guilt_shoulder_it(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the hall of inherited guilt']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 8)
        self.assertTrue(player.has_item('Burden Token'))

    def test_inherited_guilt_refuse_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the hall of inherited guilt']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 10)

    def test_inherited_guilt_refuse_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the hall of inherited guilt']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)

    def test_flickering_choir_sing_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the flickering choir']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 12)

    def test_flickering_choir_sing_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the flickering choir']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=3):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 9)

    def test_flickering_choir_cover_ears(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the flickering choir']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)
        self.assertEqual(player.sanity, 11)

    def test_paper_cathedral_effect(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the paper cathedral']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)

    def test_gasping_gate_effect(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the gasping gate']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)

    def test_teeth_in_the_floor_effect(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['teeth in the floor']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 8)

    def test_clockmakers_gallows_effect(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup["the clockmaker\u2019s gallows"]
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)

    def test_lookup_discarded_room_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the discarded room')
        self.assertIn('claim: +1 sanity', cap.getvalue().lower())

    def test_lookup_applause_trap_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the applause trap')
        self.assertIn('bow: +1 hope', cap.getvalue().lower())

    def test_lookup_compromise_engine_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the compromise engine')
        self.assertIn('insert: -2 sanity', cap.getvalue().lower())

    def test_lookup_void_restroom_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the void restroom')
        self.assertIn('use the stall', cap.getvalue().lower())

    def test_lookup_elevator_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the elevator that only goes down')
        self.assertIn('ride: roll 1d6', cap.getvalue().lower())

    def test_lookup_room_no_door_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the room with no door')
        self.assertIn('wait: -1 hope', cap.getvalue().lower())

    def test_lookup_archive_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the archive of everything that didn\u2019t work')
        self.assertIn('browse: roll 1d6', cap.getvalue().lower())

    def test_lookup_inherited_guilt_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the hall of inherited guilt')
        self.assertIn('shoulder it: -2 sanity', cap.getvalue().lower())

    def test_lookup_flickering_choir_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the flickering choir')
        self.assertIn('sing back: roll 1d6', cap.getvalue().lower())

    def test_lookup_paper_cathedral_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the paper cathedral')
        self.assertIn('+1 sanity', cap.getvalue().lower())

    def test_lookup_gasping_gate_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the gasping gate')
        self.assertIn('-1 hope', cap.getvalue().lower())

    def test_lookup_teeth_in_the_floor_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'teeth in the floor')
        self.assertIn('-2 sanity', cap.getvalue().lower())

    def test_lookup_clockmakers_gallows_effect(self):
        game = self._new_game()
        with main.CaptureBuffer() as cap:
            game.perform_lookup('auto', 'the clockmaker\u2019s gallows')
        self.assertIn('+1 sanity', cap.getvalue().lower())

    def test_description_parses_missing_stats(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the corridor of crooked steps']
        card.apply(game, player, True)
        self.assertEqual(game.hope, 11)
        self.assertEqual(player.sanity, 9)

    def test_whispering_socket_rip_it_out(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the whispering socket']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Frayed Neural Wire'))
        self.assertEqual(game.hope, 9)

    def test_whispering_socket_plug_in_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the whispering socket']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 12)
        self.assertEqual(player.sanity, 10)

    def test_pit_of_almosts_cross_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the pit of almosts']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Glimmer of What Could Be'))

    def test_pit_of_almosts_cross_failure(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the pit of almosts']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 8)

    def test_pit_of_almosts_long_way(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the pit of almosts']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)

    def test_crawlspace_finish_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the crawlspace of unfinished projects']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)

    def test_crawlspace_finish_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the crawlspace of unfinished projects']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 8)

    def test_crawlspace_burn(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the crawlspace of unfinished projects']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Ashes of Ambition'))
        self.assertEqual(game.hope, 9)

    def test_hall_of_unfinished_goodbyes_open_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['hall of unfinished goodbyes']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 11)

    def test_hall_of_unfinished_goodbyes_open_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['hall of unfinished goodbyes']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 8)

    def test_hall_of_unfinished_goodbyes_walk_away(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['hall of unfinished goodbyes']
        with patch('builtins.input', lambda prompt='': '2'):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 9)

    def test_bureaucratic_maw_fill_out(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['bureaucratic maw']
        with patch('builtins.input', lambda prompt='': '1'):
            card.apply(game, player, True)
        self.assertTrue(player.has_item('Stamp of Legitimacy'))
        self.assertEqual(game.hope, 9)

    def test_bureaucratic_maw_burn_success(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['bureaucratic maw']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=5):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 11)
        self.assertEqual(game.hope, 10)

    def test_bureaucratic_maw_burn_fail(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['bureaucratic maw']
        with patch('builtins.input', lambda prompt='': '2'), \
             patch.object(player, 'roll_d6', return_value=2):
            card.apply(game, player, True)
        self.assertEqual(game.hope, 8)

    def test_final_threshold_sacrifice(self):
        game = self._new_game()
        inputs = iter(['y', 'rob'])

        def fake_input(prompt=''):
            return next(inputs)

        with patch('builtins.input', fake_input), main.CaptureBuffer() as cap:
            result = game.run_final_threshold()
        self.assertTrue(result)
        self.assertIn('lost to the Abyss', cap.getvalue())

    def test_final_threshold_escape_together(self):
        game = self._new_game()

        with patch('builtins.input', lambda prompt='': 'n'), \
             patch.object(game.players[0], 'roll_d6', return_value=5), \
             patch.object(game.players[1], 'roll_d6', return_value=6), \
             main.CaptureBuffer() as cap:
            result = game.run_final_threshold()
        self.assertTrue(result)
        self.assertIn('Both players escape together', cap.getvalue())

    def test_abyssal_shift_turn_trigger(self):
        game = self._new_game()
        with patch.object(game.board, 'shuffle_tiles') as shuffle, \
             patch.object(game.players[0], 'roll_d6', return_value=4), \
             patch.object(game.players[1], 'roll_d6', return_value=4):
            game.turn_count = 10
            game.maybe_trigger_abyssal_shift()
        self.assertTrue(shuffle.called)

    def test_abyssal_shift_reveal_trigger(self):
        game = self._new_game()
        count = 0
        for x in range(game.board.size):
            for y in range(game.board.size):
                if count < 12:
                    game.board.tile_at(x, y).revealed = True
                    count += 1
        with patch.object(game.board, 'shuffle_tiles') as shuffle, \
             patch.object(game.players[0], 'roll_d6', return_value=4), \
             patch.object(game.players[1], 'roll_d6', return_value=4):
            game.maybe_trigger_abyssal_shift()
        self.assertTrue(shuffle.called)

    def test_rest_cooldown(self):
        game = self._new_game()
        player = game.players[0]
        with patch('builtins.input', lambda prompt='': 'rest'):
            game.player_turn(player)
        inputs = iter(['rest', 'end'])

        def fake_input(prompt=''):
            return next(inputs)

        with patch('builtins.input', fake_input), main.CaptureBuffer() as cap:
            game.player_turn(player)
        self.assertIn('cannot rest two turns in a row', cap.getvalue().lower())

    def test_sanctuary_rest_avoids_hope_loss(self):
        game = self._new_game()
        player = game.players[0]
        tile = game.board.tile_at(player.x, player.y)
        tile.location = main.LocationCard('Sanctuary Node', 'calm', 'Resting here restores +1 Sanity, no Hope loss.')
        with patch('builtins.input', lambda prompt='': 'rest'):
            game.player_turn(player)
        self.assertEqual(game.hope, 10)
        self.assertEqual(player.sanity, 11)

    def test_anti_camping_triggers_shadow(self):
        game = self._new_game()
        player = game.players[0]
        tile = game.board.tile_at(player.x, player.y)
        tile.location = main.LocationCard('Sanctuary Node', 'calm')
        with patch('builtins.input', lambda prompt='': 'end'):
            game.player_turn(player)
        with patch('builtins.input', lambda prompt='': 'end'), \
             patch.object(player, 'roll_d6', return_value=3):
            game.player_turn(player)
        self.assertEqual(player.sanity, 9)

    def test_elevator_adds_memory(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['the elevator that only goes down']
        with patch('builtins.input', lambda prompt='': '1'), \
             patch.object(player, 'roll_d6', return_value=6):
            card.apply(game, player, True)
        self.assertIn('Echo of the Elevator', player.memories)

    def test_memory_bonus_final_threshold(self):
        game = self._new_game()
        player = game.players[0]
        player.add_memory('Echo of the Elevator')
        with patch('builtins.input', lambda prompt='': 'n'), \
             patch.object(player, 'roll_d6', return_value=4), \
             patch.object(game.players[1], 'roll_d6', return_value=5), \
             main.CaptureBuffer() as cap:
            result = game.run_final_threshold()
        self.assertTrue(result)
        self.assertIn('Both players escape together', cap.getvalue())

    def test_dead_frequency_grants_bonus(self):
        game = self._new_game()
        player = game.players[0]
        player.add_memory('Echo of the Elevator')
        card = game.encounter_lookup['dead frequency']
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertEqual(game.final_gate_bonus, 1)

    def test_hall_broken_echoes_linger(self):
        game = self._new_game()
        player = game.players[0]
        game.check_broken_echoes(player, 'Hall of Broken Echoes')  # move in
        start = player.sanity
        game.check_broken_echoes(player, 'Hall of Broken Echoes')  # linger
        self.assertEqual(player.sanity, start - 1)

    def test_digital_immunity_trait(self):
        traits = {'Robtergeist': ['Digital Immunity']}
        game = main.Game(traits=traits)
        player = game.players[0]
        card = main.EncounterCard('Digital Apparition', 'A glitchy ghost', effect={'Sanity': -1})
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        self.assertEqual(player.sanity, 10)

    def test_no_sanity_recovery_modifier(self):
        game = main.Game(modifiers=['no_sanity_recovery'])
        player = game.players[0]
        player.sanity = 5
        player.apply_effect(game, sanity=2)
        self.assertEqual(player.sanity, 5)

    def test_custom_board_size(self):
        game = main.Game(board_size=7)
        self.assertEqual(game.board.size, 7)
        self.assertEqual(len(game.board.grid), 7)

    def test_echo_node_remote_trade(self):
        game = self._new_game()
        p1, p2 = game.players
        # move players to different echo nodes
        coords = game.board.echo_nodes
        p1.x, p1.y = coords[0]
        p2.x, p2.y = coords[1]
        item = Item('Test Item', 'desc')
        p1.add_item(item)
        game.trade(p1, p2, 'Test Item')
        self.assertFalse(p1.has_item('Test Item'))
        self.assertTrue(p2.has_item('Test Item'))

    def test_null_signal_bloom_disables_items_until_shift(self):
        game = self._new_game()
        player = game.players[0]
        card = game.encounter_lookup['null signal bloom']
        token = game.item_registry['memory token']
        player.add_item(Item(token.name, token.description, effect_text=token.effect_text, use_effect=token.use_effect))
        with patch('builtins.input', dummy_input):
            card.apply(game, player, True)
        player.use_item(game, 'memory token', '')
        self.assertTrue(player.has_item('Memory Token'))
        self.assertFalse(player.reroll_next)
        game.abyssal_shift()
        player.use_item(game, 'memory token', '')
        self.assertFalse(player.has_item('Memory Token'))
        self.assertTrue(player.reroll_next)

    def test_morality_dilemma_applies(self):
        game = self._new_game()
        dilemma = main.MoralityDilemma(
            'Test Dilemma',
            'desc',
            [{'Text': 'do it', 'Effect': {'Sanity': -1}}]
        )
        game.dilemmas = [dilemma]
        p1, p2 = game.players
        with patch('builtins.input', lambda prompt='': '1'):
            game.run_morality_dilemma()
        self.assertEqual(p1.sanity, 9)
        self.assertEqual(p2.sanity, 9)

    def test_old_coin_cancels_dilemma(self):
        game = self._new_game()
        coin = game.item_registry['old coin']
        p1 = game.players[0]
        p1.add_item(Item(coin.name, coin.description, effect_text=coin.effect_text, use_effect=coin.use_effect))
        dilemma = main.MoralityDilemma(
            'Test',
            'desc',
            [{'Text': 'x', 'Effect': {'Hope': -1}}]
        )
        game.dilemmas = [dilemma]
        p1.use_item(game, 'old coin', '')
        with patch('builtins.input', lambda prompt='': '1'):
            game.run_morality_dilemma()
        self.assertEqual(game.hope, 10)


def json_names(filename):
    import json
    with open(filename) as f:
        data = json.load(f)
    return [row['Name'] for row in data]

if __name__ == '__main__':
    unittest.main()
