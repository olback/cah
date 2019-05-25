import * as assert from 'assert';
import { Player } from '../player';

describe('Player.ts', () => {

    describe('new Player', () => {

        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        const p = new Player('pid-string', null);

        it('instanceof is Player', () => {

            assert.strictEqual(p instanceof Player, true);

        });

        it('id is \'pid-string\'', () => {

            assert.strictEqual(p.id, 'pid-string');

        });

        it('username is empty', () => {

            assert.strictEqual(p.username, '');

        });

        it('inGame is false', () => {

            assert.strictEqual(p.inGame, false);

        });

        it('username is empty', () => {

            assert.strictEqual(p.username, '');

        });

        it('score is 0', () => {

            assert.strictEqual(p.score, 0);

        });

        it('blanksPlayed is 0', () => {

            assert.strictEqual(p.blanksPlayed, 0);

        });

        it('hand is an empty array', () => {

            assert.deepStrictEqual(p.hand, []);

        });

        it('picks is an empty array', () => {

            assert.deepStrictEqual(p.picks, []);

        });

    });

    describe('#newRound()', () => {

        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        const p = new Player('pid-string', null);

        it('set picks', () => {

            const card = {
                id: 55,
                pack: 'Test Pack',
                text: 'This is a test card.'
            };

            p.picks.push(card);

            assert.deepStrictEqual(p.picks, [card]);

        });

        it('picks is an empty array', () => {

            p.newRound();

            assert.deepStrictEqual(p.picks, []);

        });

    });

    describe('#newGame()', () => {

        // this.blanksPlayed = 0;
        // this.score = 0;
        // this.hand = [];
        // this.picks = [];

        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        const p = new Player('pid-string', null);

        it('set blanksPlayed', () => {

            p.blanksPlayed = 5;
            assert.strictEqual(p.blanksPlayed, 5);

        });

        it('set score', () => {

            p.score = 3;
            assert.strictEqual(p.score, 3);

        });

        it('set hand', () => {

            const card = {
                id: 55,
                pack: 'Test Pack',
                text: 'This is a test card.'
            };

            p.hand.push(card, card, card);
            assert.deepStrictEqual(p.hand, [card, card, card]);

        });

        it('set picks', () => {

            const card = {
                id: 55,
                pack: 'Test Pack',
                text: 'This is a test card.'
            };

            p.picks.push(card);
            assert.deepStrictEqual(p.picks, [card]);

        });

        it('properties reset', () => {

            p.newGame();

            assert.strictEqual(p.blanksPlayed, 0);
            assert.strictEqual(p.score, 0);
            assert.deepStrictEqual(p.hand, []);
            assert.deepStrictEqual(p.picks, []);

        });

    });

    describe('#leaveGame()', () => {

        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        const p = new Player('pid-string', null);

        it('set inGame', () => {

            p.inGame = true;
            assert.strictEqual(p.inGame, true);

        });

        it('set blanksPlayed', () => {

            p.blanksPlayed = 5;
            assert.strictEqual(p.blanksPlayed, 5);

        });

        it('set score', () => {

            p.score = 3;
            assert.strictEqual(p.score, 3);

        });

        it('set hand', () => {

            const card = {
                id: 55,
                pack: 'Test Pack',
                text: 'This is a test card.'
            };

            p.hand.push(card, card, card);
            assert.deepStrictEqual(p.hand, [card, card, card]);

        });

        it('set picks', () => {

            const card = {
                id: 55,
                pack: 'Test Pack',
                text: 'This is a test card.'
            };

            p.picks.push(card);
            assert.deepStrictEqual(p.picks, [card]);

        });

        it('properties reset', () => {

            p.leaveGame();

            assert.strictEqual(p.inGame, false);
            assert.strictEqual(p.blanksPlayed, 0);
            assert.strictEqual(p.score, 0);
            assert.deepStrictEqual(p.hand, []);
            assert.deepStrictEqual(p.picks, []);

        });


    });

});
