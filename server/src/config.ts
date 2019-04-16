import { env } from 'process';
import { ClientConfig } from 'pg';

const dbConf: ClientConfig = {
    host: env.PG_HOST,
    port: Number(env.PG_PORT),
    user: env.PG_USER,
    password: env.PG_PASSWORD,
    database: env.PG_USER
}

export {
    dbConf
}
