import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

interface Stats {
  players: number;
  games: number;
  version: string;
  commitDate: string;
}

interface Stack {
  angular: string;
  node: string;
  postgres: string;
}

export interface IInfo {
  stack: Stack;
  stats: Stats;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  // stats: Stats = {
  //   players: 0,
  //   games: 0,
  //   version: 'unknown',
  //   commitDate: 'unknown'
  // };

  // stack: Stack = {
  //   angular: 'unknown',
  //   node: 'unknown',
  //   postgres: 'unknown'
  // };

  info: IInfo = {
    stack: {
      angular: 'unknown',
      node: 'unknown',
      postgres: 'unknown'
    },
    stats: {
      players: 0,
      games: 0,
      version: 'unknown',
      commitDate: 'unknown'
    }
  };

  // stack: Stack = {
  //   // @ts-ignore
  //   angular: getAllAngularRootElements()[0].attributes['ng-version'].value,
  //   node: 'unknown',
  //   postgres: 'unknown'
  // };

  constructor(private _socket: Socket) {
    this._socket.on('info', (info: IInfo) => {
      this.info = info;
    });
  }

  ngOnInit() {
    this._socket.emit('info');
  }

}
