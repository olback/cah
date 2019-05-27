import { JoinGame } from './join-game';

describe('[Class] JoinGame', () => {

    const joinGame = new JoinGame('pid-string', 'gid-string', 'a great game password 🏂');

    it('pid should be \'pid-string\'', () => {
        expect(joinGame.pid).toEqual('pid-string');
    });

    it('gid should be \'gid-string\'', () => {
        expect(joinGame.gid).toEqual('gid-string');
    });

    it('password should be \'a great game password 🏂\'', () => {
        expect(joinGame.password).toEqual('a great game password 🏂');
    });

});
