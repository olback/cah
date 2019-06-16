import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { TokenService } from './token.service';
import { UpdateUsernameRequest } from '@class/update-username-request';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket, private _tokenService: TokenService) {

    this.socket.on('err', (e: any) => console.error(e));

  }


  auth() {

    this.socket.emit('login', this._tokenService.get());

  }

  setUsername(username: string) {

    const user = new UpdateUsernameRequest(this._tokenService.get(), username);
    this.socket.emit('username', user);

  }

}
