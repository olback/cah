import { Setting } from './setting';

describe('[Class] Setting (string)', () => {

    localStorage.clear();
    const ss = new Setting('ss', 'String', 'String setting', 'test#1', 'This is a test setting for strings');

    it('check initial properties', () => {
        expect(ss.name).toEqual('ss');
        expect(ss.type).toEqual('String');
        expect(ss.prettyName).toEqual('String setting');
        expect(ss.defaultValue).toEqual('test#1');
        expect(ss.description).toEqual('This is a test setting for strings');
        // @ts-ignore
        expect(ss.cb).toEqual(undefined);
    });

    it('#get before #set', () => {
        expect(ss.get()).toEqual(ss.defaultValue);
        expect(ss.get()).toEqual('test#1');
    });

    it('#set', () => {
        ss.set('test#2');
        expect(ss.get()).not.toEqual(ss.defaultValue);
        expect(ss.get()).toEqual('test#2');
    });

    it('#setCb', () => {
        ss.setCb((v) => {
            expect(v).toEqual('test#3');
        });
        // @ts-ignore
        expect(typeof ss.cb).toEqual('function');
    });

    it('#set with callback', () => {
        ss.set('test#3');
    });

    it('#setCb(undefined)', () => {
        ss.setCb(undefined);
        // @ts-ignore
        expect(ss.cb).toEqual(undefined);
    });

    it('#reset', () => {
        ss.reset();
        expect(ss.get()).toEqual(ss.defaultValue);
    });


});

describe('[Class] Setting (number)', () => {

    localStorage.clear();
    const sn = new Setting('sn', 'Number', 'Number setting', 42, 'This is a test setting for numbers');

    it('check initial properties', () => {
        expect(sn.name).toEqual('sn');
        expect(sn.type).toEqual('Number');
        expect(sn.prettyName).toEqual('Number setting');
        expect(sn.defaultValue).toEqual(42);
        expect(sn.description).toEqual('This is a test setting for numbers');
        // @ts-ignore
        expect(sn.cb).toEqual(undefined);
    });

    it('#get before #set', () => {
        expect(sn.get()).toEqual(sn.defaultValue);
        expect(sn.get()).toEqual(42);
    });

    it('#set', () => {
        sn.set(15);
        expect(sn.get()).not.toEqual(sn.defaultValue);
        expect(sn.get()).toEqual(15);
    });

    it('#setCb', () => {
        sn.setCb((v) => {
            expect(v).toEqual(158);
        });
        // @ts-ignore
        expect(typeof sn.cb).toEqual('function');
    });

    it('#set with callback', () => {
        sn.set(158);
    });

    it('#setCb(undefined)', () => {
        sn.setCb(undefined);
        // @ts-ignore
        expect(sn.cb).toEqual(undefined);
    });

    it('#set with number as string', () => {
        sn.set('73');
        expect(sn.get()).toEqual(73);
    });

    it('#set with string input (yielding in nan)', () => {
        sn.set('asdf');
        expect(sn.get()).toEqual(sn.defaultValue);
        expect(sn.get()).not.toBeNaN();
    });

    it('#reset', () => {
        sn.reset();
        expect(sn.get()).toEqual(sn.defaultValue);
    });

});

describe('[Class] Setting (boolean)', () => {

    localStorage.clear();
    const sb = new Setting('sb', 'Boolean', 'Boolean setting', true, 'This is a test setting for booleans');

    it('check initial properties', () => {
        expect(sb.name).toEqual('sb');
        expect(sb.type).toEqual('Boolean');
        expect(sb.prettyName).toEqual('Boolean setting');
        expect(sb.defaultValue).toEqual(true);
        expect(sb.description).toEqual('This is a test setting for booleans');
        // @ts-ignore
        expect(sb.cb).toEqual(undefined);
    });

    it('#get before #set', () => {
        expect(sb.get()).toEqual(sb.defaultValue);
        expect(sb.get()).toEqual(true);
    });

    it('#set', () => {
        sb.set(false);
        expect(sb.get()).not.toEqual(sb.defaultValue);
        expect(sb.get()).toEqual(false);
    });

    it('#setCb', () => {
        sb.setCb((v) => {
            expect(v).toEqual(true);
        });
        // @ts-ignore
        expect(typeof sb.cb).toEqual('function');
    });

    it('#set with callback', () => {
        sb.set(true);
    });

    it('#setCb(undefined)', () => {
        sb.setCb(undefined);
        // @ts-ignore
        expect(sb.cb).toEqual(undefined);
    });

    it('#set with boolean as string (true)', () => {
        sb.set('true');
        expect(sb.get()).toEqual(true);
    });

    it('#set with boolean as string (false)', () => {
        sb.set('false');
        expect(sb.get()).toEqual(false);
    });

    it('#set with string input', () => {
        sb.set('asdf');
        expect(sb.get()).toEqual(false);
    });

    it('#reset', () => {
        sb.reset();
        expect(sb.get()).toEqual(sb.defaultValue);
    });

});
