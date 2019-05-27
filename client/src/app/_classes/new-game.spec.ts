import { NewGame } from './new-game';

describe('[Class] NewGame', () => {

    const newGame = new NewGame(
        'pid-string',
        'gid-string',
        8,
        5,
        0,
        ['Test pack #1', 'Test pack #2', 'Test pack #3'],
        'a great game password 🏂',
        5
    );

    it('pid should be \'pid-string\'', () => {
        expect(newGame.pid).toEqual('pid-string');
    });

    it('gid should be \'gid-string\'', () => {
        expect(newGame.gid).toEqual('gid-string');
    });

    it('maxScore should be a number', () => {
        expect(typeof newGame.maxScore).toEqual('number');
    });

    it('maxScore should never be more than 100 when setting with _maxScore', () => {
        newGame._maxScore = 150;
        setTimeout(() => {
            expect(newGame.maxScore).toEqual(100);
        }, 1);
    });

    it('maxScore should never be less than 3 when setting with _maxScore', () => {
        newGame._maxScore = 0;
        setTimeout(() => {
            expect(newGame.maxScore).toEqual(3);
        }, 1);
    });

    it('maxPlayers should be a number', () => {
        expect(typeof newGame.maxPlayers).toEqual('number');
        expect(newGame.maxPlayers).not.toBeNaN();
    });

    it('maxPlayers should never be more than 10 when setting with _maxPlayers', () => {
        newGame._maxPlayers = 15;
        setTimeout(() => {
            expect(newGame.maxPlayers).toEqual(10);
            expect(newGame.maxPlayers).not.toBeNaN();
        }, 1);
    });

    it('maxPlayers should never be less than 3 when setting with _maxPlayers', () => {
        newGame._maxPlayers = 0;
        setTimeout(() => {
            expect(newGame.maxPlayers).toEqual(3);
        }, 1);
    });

    it('timeout should be a number', () => {
        expect(typeof newGame.timeout).toEqual('number');
        expect(newGame.timeout).not.toBeNaN();
    });

    it('blanks should be a number', () => {
        expect(typeof newGame.blanks).toEqual('number');
        expect(newGame.blanks).not.toBeNaN();
    });

    it('packs should be an array of strings', () => {
        expect(newGame.packs).toEqual(['Test pack #1', 'Test pack #2', 'Test pack #3']);
        for (const p of newGame.packs) {
            expect(typeof p).toEqual('string');
        }
    });

    it('password should be \'a great game password 🏂\'', () => {
        expect(typeof newGame.password).toEqual('string');
        expect(newGame.password).toEqual('a great game password 🏂');
    });

    it('blanks should never be more than 100 when setting with _blanks', () => {
        newGame._blanks = 150;
        setTimeout(() => {
            expect(newGame.blanks).toEqual(100);
        }, 1);
    });

    it('blanks should never be less than 0 when setting with _blanks', async () => {
        newGame._blanks = -17;
        setTimeout(() => {
            expect(newGame.blanks).toEqual(0);
        }, 1);
    });

});

