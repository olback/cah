import { GameRequest } from './game-request';

describe('[Class] GameRequest', () => {

    const gameRequest = new GameRequest('pid-string', 'gid-string');

    it('pid should be \'pid-string\'', () => {
        expect(gameRequest.pid).toEqual('pid-string');
    });

    it('gid should be \'gid-string\'', () => {
        expect(gameRequest.gid).toEqual('gid-string');
    });

});
