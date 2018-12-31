"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var process_1 = require("process");
var port = process_1.env.PORT ? Number(process_1.env.PORT) : 5000;
var app = express_1.default();
var server = app.listen(port, function () {
    console.log("Server listening on port " + port);
});
var io = socket_io_1.default(server);
io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('hello', function (data) {
        console.log(data);
        socket.emit('m', 'aaaaaaaa');
    });
});
app.get('**', function (_req, res) {
    res.send('ok');
});
