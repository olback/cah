import { Winner } from './winner';

describe('[Class] Winner', () => {

    const winner = new Winner('pid-string', 'gid-string', 'winner-pid');

    it('pid should be \'pid-string\'', () => {
        expect(winner.pid).toEqual('pid-string');
    });

    it('gid should be \'gid-string\'', () => {
        expect(winner.gid).toEqual('gid-string');
    });

    it('whiteCard should be \'winner-pid\'', () => {
        expect(winner.winner).toEqual('winner-pid');
    });

});
