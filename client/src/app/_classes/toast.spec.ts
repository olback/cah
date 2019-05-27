import { Toast } from './toast';

describe('[Class] Toast', () => {

    const toast = new Toast('Test toast.');

    it('message should be \'Test toast.\'', () => {
        expect(toast.message).toEqual('Test toast.');
    });

    it('hidden is true', () => {
        expect(toast.hidden).toEqual(true);
    });

    it('#show', () => {
        toast.show();
        expect(toast.hidden).toEqual(false);
    });

    it('#hide', () => {
        toast.close();
        expect(toast.hidden).toEqual(true);
    });

    it('#setMsg', () => {
        toast.setMsg('Test toast 2.');
        expect(toast.message).toEqual('Test toast 2.');
    });

});
