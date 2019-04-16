interface UsernameUpdate {
    id: string;
    username: string;
}

interface NewGame {
    id: string;
    gameId: string;
    packs: string[];
}

interface WhiteCard {
    id: number;
    text: string;
}

interface Pack {
    pack: string;
    black: number;
    white: number;
}

interface LogResponse {
    players: string[];
    games: string[];
    any: any;
}

