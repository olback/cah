import { Component, OnInit } from '@angular/core';
import { UsernameService } from '@service/username.service';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { TokenService } from '@service/token.service';
import { JoinGame } from '@class/join-game';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  username: string;
  joinGame = new JoinGame(this._token.get(), '', '');
  pathIsJoin = false;

  constructor(
    private _route: ActivatedRoute,
    private _socket: Socket,
    private _token: TokenService,
    private _usernameService: UsernameService
    ) { }

  ngOnInit() {

    this.username = this._usernameService.get();

    if (this._route.routeConfig.path === 'join/:id') {
      this.pathIsJoin = true;
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
