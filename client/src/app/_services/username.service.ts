import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  username = '';

  constructor(private _socketService: SocketService) { }

  set(username: string) {

    sessionStorage.setItem('username', username);
    this._socketService.setUsername(username);

  }

  get() {

    return sessionStorage.getItem('username') || '';

  }

}
