interface UsernameUpdate {
    id: string;
    username: string;
}

interface NewGame {
    id: string;
    gameId: string;
    packs: string[];
}

interface LogResponse {
    players: string[];
    games: string[];
}

