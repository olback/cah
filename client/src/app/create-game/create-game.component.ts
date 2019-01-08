import { Component, OnInit, DoCheck } from '@angular/core';

// TODO:FIXME: Temp interface
interface Pack {
  name: string;
  tag: string;
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

  packs: Pack[] = [
    {
      name: 'US Pack',
      tag: 'US',
      black: 27,
      white: 64,
      selected: false,
      hidden: false
    },
    {
      name: 'Base Game',
      tag: 'BASE',
      black: 57,
      white: 144,
      selected: false,
      hidden: false
    },
    {
      name: 'Canadian Pack',
      tag: 'CA',
      black: 25,
      white: 47,
      selected: false,
      hidden: false
    },
    {
      name: 'Jew Pack',
      tag: 'JEW',
      black: 19,
      white: 32,
      selected: false,
      hidden: false
    },
    {
      name: 'Weed Pack',
      tag: 'WEED',
      black: 420,
      white: 1337,
      selected: false,
      hidden: false
    },
    {
      name: 'Word Wide Web Pack',
      tag: 'WWW',
      black: 24,
      white: 45,
      selected: false,
      hidden: false
    }
  ];

  constructor() { }

  ngOnInit() {
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

      if (p.tag === pack.tag) {
        p.selected = !p.selected;
        break;
      }

    }

  }

}
