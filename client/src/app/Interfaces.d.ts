interface Player {
}

interface GameSettings {
    gameId: string;
    hostId: string;
    packs: string[];
    timeout: number;
    maxPlayers: number;
    players?: {
        [pid: string]: Player
    }

}


