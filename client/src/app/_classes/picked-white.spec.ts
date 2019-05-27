import { PickedWhite } from './picked-white';

describe('[Class] PickedWhite', () => {

    const whiteCard: WhiteCard = {
        id: 42,
        pack: 'Test pack #1',
        text: 'Test card.'
    };

    const pickedWhite = new PickedWhite('pid-string', 'gid-string', whiteCard);

    it('pid should be \'pid-string\'', () => {
        expect(pickedWhite.pid).toEqual('pid-string');
    });

    it('gid should be \'gid-string\'', () => {
        expect(pickedWhite.gid).toEqual('gid-string');
    });

    it('whiteCard should be WhiteCard', () => {
        expect(pickedWhite.card).toEqual(whiteCard);
    });

});
