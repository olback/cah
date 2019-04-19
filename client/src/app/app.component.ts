import { Component, OnInit, DoCheck } from '@angular/core';
import { environment as env } from '../environments/environment';
import { SocketService } from './_services/socket.service';
import { UsernameService } from './_services/username.service';
import { TokenService } from './_services/token.service';
import { SettingsService } from './_services/settings.service';
import { Socket } from 'ngx-socket-io';
import { Toast } from './_classes/toast';
import { Router } from '@angular/router';

interface SocketError {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {

  acronym = 'Crabs Adjust Humidity';
  username = '';
  toast = new Toast('');

  constructor(
    private _socketService: SocketService,
    private _usernameService: UsernameService,
    private _tokenService: TokenService,
    private _settings: SettingsService,
    private _socket: Socket,
    private _router: Router
    ) {

    if (!env.production) {
      console.log(`Token: ${this._tokenService.get()}`);
    }

    this._socketService.auth();
    this._usernameService.set(this._usernameService.get());
    this.username = this._usernameService.get();

    if (this._settings.get('acronyms', 'boolean')) {

      this._socket.on('acronym', (acronym: string) => {
        this.acronym = acronym;
      });

      this._socket.emit('acronym');

    }

    this._socket.on('error-message', (data: SocketError) => {
      this.toast.setMsg(data.message);
      this.toast.show();
    });

    this._socket.on('redirect', (data: string[]) => {
      console.log(data);
      this._router.navigate(data);
    });

  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.username = this._usernameService.get();
  }

}
