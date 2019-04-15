"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var process_1 = require("process");
var player_1 = require("./player");
// import './data.d.ts';
var port = process_1.env.PORT ? Number(process_1.env.PORT) : 5000;
var app = express_1.default();
var server = app.listen(port, function () {
    console.log("Server listening on port " + port);
});
var io = socket_io_1.default(server);
var games = {};
var players = {};
io.on('connection', function (socket) {
    console.log("New socket: " + socket.id);
    socket.on('login', function (id) {
        if (players[id]) {
            players[id].socket = socket;
            console.log("Updating socket for player " + id + ".");
        }
        else {
            players[String(id)] = new player_1.Player(id, socket);
            console.log("Player " + id + " joined the game.");
        }
    });
    socket.on('username', function (data) {
        var id = data.id, username = data.username;
        players[id].username = username;
        console.log("Player " + id + " changed username to " + (username ? username : '<none>') + ".");
    });
    socket.on('new-game', function (data) {
        // games[data.gameId] = new Game(data.gameId,)
    });
    socket.on('error', function (e) {
        console.error(e);
    });
    socket.on('disconnect', function () {
        for (var p in players) {
            if (players[p].socket.id === socket.id) {
                console.log("Player " + players[p].id + " has left the game.");
                delete players[p];
            }
        }
    });
});
app.get('**', function (_req, res) {
    var r = {
        players: [],
        games: []
    };
    for (var p in players) {
        r.players.push(p);
    }
    res.json(r);
});
