import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket, private _tokenService: TokenService) {

    this.socket.on('err', console.log);

  }


  auth() {

    this.socket.emit('login', this._tokenService.get());

  }

  setUsername(username: string) {

    this.socket.emit('username', { pid: this._tokenService.get(), username: username });

  }

}
