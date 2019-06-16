import * as log from 'solid-log';
import * as path from 'path';
import * as fs from 'fs';
import { env } from 'process';
import { dbConf } from './config';
import { Client } from 'pg';
import { Players } from './player';
import { Games } from './game';
import * as git from 'git-rev-sync';

export interface Stats {
    players: number;
    games: number;
    version: string;
    commitDate: string;
}

export interface Stack {
    angular: string;
    node: string;
    postgres: string;
}

export interface IInfo {
    stack: Stack;
    stats: Stats;
}

export function getStats(players: Players, games: Games): Stats {

    return {
        players: Object.keys(players).length,
        games: Object.keys(games).length,
        version: git.short(),
        commitDate: git.date().toUTCString()
    };

}

export async function getStack(): Promise<Stack> {

    try {

        const db = new Client(dbConf);
        await db.connect();
        const dbres = await db.query('select VERSION()');
        db.end();

        const r: Stack = {
            angular: JSON.parse(fs.readFileSync(path.join('..', 'client', 'package.json')).toString('utf8'))['dependencies']['@angular/core'].replace('~', ''),
            node: env.NODE_VERSION || 'version unknown',
            postgres: dbres.rows[0].version.split(' ')[1]
        };

        return r;

    } catch (e) {

        log.error(e);

        return {
            angular: 'version unknown',
            node: 'version unknown',
            postgres: 'version unknown'
        };

    }

}
