import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

interface Stats {
  players: number;
  games: number;
  version: string;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  stats: Stats = {
    players: 0,
    games: 0,
    version: 'unknown'
  };

  constructor(private _socket: Socket) {
    this._socket.on('info', (stats: Stats) => {
      this.stats = stats;
    });
  }

  ngOnInit() {
    this._socket.emit('info');
  }

}
