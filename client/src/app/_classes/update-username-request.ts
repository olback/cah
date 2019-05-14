import { Request } from './request';

export class UpdateUsernameRequest implements Request {
    constructor(
        public pid: string,
        public username: string
    ) { }
}
