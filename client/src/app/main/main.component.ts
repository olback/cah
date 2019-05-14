import { Component, OnInit } from '@angular/core';
import { UsernameService } from '../_services/username.service';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { TokenService } from '../_services/token.service';
import { JoinGame } from '../_classes/join-game';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  username: string;
  joinGame = new JoinGame(this._token.get(), '', '');

  constructor(
    private _route: ActivatedRoute,
    private _socket: Socket,
    private _token: TokenService,
    private _usernameService: UsernameService
    ) { }

  ngOnInit() {

    this.username = this._usernameService.get();

    if (this._route.routeConfig.path === 'join/:id') {
      this._route.params.forEach(v => {
        this.joinGame.gid = v.id;
      });
    }

  }

  setUsername() {

    this._usernameService.set(this.username);

  }

  join() {

    this._socket.emit('join-game', this.joinGame);

  }

}
