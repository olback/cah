import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  open = false;
  gid = '';
  settings: GameState = {
    gameId: '',
    hostId: '',
    packs: ['Weed Pack', 'CAH Base Set', 'World Wide Web Pack'],
    timeout: 0,
    maxPlayers: 5,
    players: {
      'aaaaaa': {
        username: 'chrome'
      },
      'bbbbbb': {
        username: 'firefox'
      },
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _socket: Socket,
    private _token: TokenService
  ) { }

  ngOnInit() {
    this._route.params.forEach(v => {
      this.gid = v.id;
    });

    this._socket.emit('game', { pid: this._token.get(), gid: this.gid });
  }

}
