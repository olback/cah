import { Component, OnInit, DoCheck } from '@angular/core';
import { environment as env } from '../environments/environment';
import { SocketService } from './_services/socket.service';
import { UsernameService } from './_services/username.service';
import { TokenService } from './_services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {

  username = '';

  constructor(private _socketService: SocketService, private _usernameService: UsernameService, private _tokenService: TokenService) {

    if (!env.production) {
      console.log(`Token: ${this._tokenService.get()}`);
    }

    this._socketService.auth();
    this._usernameService.set(this._usernameService.get());

  }

  ngOnInit() {
    this.username = this._usernameService.get();
  }

  ngDoCheck() {
    this.username = this._usernameService.get();
  }

}
