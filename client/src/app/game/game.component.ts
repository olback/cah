import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  open = false;
  gid = '';
  game: ISocket.GameState.State;

  constructor(
    private _route: ActivatedRoute,
    private _socket: Socket,
    private _token: TokenService
  ) {

    this._socket.on('game', (game: ISocket.GameState.State) => {
      this.game = game;
      console.log(this.game);
    });

  }

  ngOnInit() {
    this._route.params.forEach(v => {
      this.gid = v.id;
    });

    this._socket.emit('game', { pid: this._token.get(), gid: this.gid });
  }

  ngOnDestroy(): void {
    this._socket.emit('leave-game', {
      pid: this._token.get(),
      gid: this.gid
    });
  }

}
