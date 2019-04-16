import { Component, OnInit, DoCheck } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../_services/socket.service';

// TODO:FIXME: Temp interface
interface Pack {
  name: string;
  // tag: string;
  black: number;
  white: number;
  selected: boolean;
  hidden: boolean;
}

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit, DoCheck {

  // Temp variable FIXME:TODO:
  gameId: string = (Math.random() * 1E17).toString(36);
  baseUrl: string =  location.origin;

  query: string;
  black = 0;
  white = 0;
  packs: Pack[] = [];

  constructor(private _socket: Socket, private _socketService: SocketService) {

    this._socket.on('get-packs-list', data => {
      console.log(data);
      for (const d of data) {
        this.packs.push({
          name: d.pack,
          black: d.black,
          white: d.white,
          selected: false,
          hidden: false
        });
      }
    });

  }

  ngOnInit() {
    this._socket.emit('get-packs-list');
  }

  ngDoCheck() {

    this.black = 0;
    this.white = 0;

    for (const p of this.packs) {

      if (p.selected) {

        this.black += p.black;
        this.white += p.white;

      }

    }

  }

  filter() {

    const properties = ['name', 'tag'];

    for (const p of this.packs) {

      p.hidden = !properties.some(v => new RegExp(this.query, 'gi').test(p[v]));

    }

  }

  toggleAll(b: boolean) {

    for (const p of this.packs) {

      if (!p.hidden) {

        p.selected = b;

      }

    }

  }

  togglePack(pack: Pack) {

    for (const p of this.packs) {

      if (p.name === pack.name) {
        p.selected = !p.selected;
        break;
      }

    }

  }

}
