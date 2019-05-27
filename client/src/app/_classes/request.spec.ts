import { Request } from './request';

describe('[Class] Request', () => {

    const request = new Request('pid-string');

    it('pid should be \'pid-string\'', () => {
        expect(request.pid).toEqual('pid-string');
    });

});
