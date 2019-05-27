import { BlankCard } from './blank-card';

describe('[Class] BlankCard', () => {

    const blankCard = new BlankCard('pid-string', 'gid-string', 'Test card.');

    it('pid should be \'pid-string\'', () => {
        expect(blankCard.pid).toEqual('pid-string');
    });

    it('gid should be \'gid-string\'', () => {
        expect(blankCard.gid).toEqual('gid-string');
    });

    it('text should be \'Test card.\'', () => {
        expect(blankCard.text).toEqual('Test card.');
    });

});
