import { Request } from './request';

export class GameRequest implements Request {
    constructor(
        public pid: string,
        public gid: string
    ) { }
}
