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
        players[String(id)] = new player_1.Player(id, socket);
        for (var p in players) {
            console.log("ID: " + p);
        }
    });
    socket.on('username', function (data) {
        var id = data.id, username = data.username;
        players[id].username = username;
    });
    socket.on('new-game', function (data) {
        // games[data.gameId] = new Game(data.gameId,)
    });
    socket.on('error', function (e) {
        console.error(e);
    });
});
app.get('**', function (_req, res) {
    res.send('ok');
});
