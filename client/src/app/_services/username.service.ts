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

    if (username.toLowerCase() === 'comic sans') {
      console.log('Stop it, get some help.');
      document.getElementsByTagName('body')[0].style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive';
    } else {
      document.getElementsByTagName('body')[0].style.fontFamily =
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';
    }

  }

  get() {

    return sessionStorage.getItem('username') || '';

  }

}
