import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  open = false;
  settings: GameSettings = {
    gameId: '',
    hostId: '',
    packs: ['Weed Pack', 'CAH Base Set', 'World Wide Web Pack'],
    timeout: 0,
    maxPlayers: 5,
    players: {
      'aaaaaa': {
        username: 'chrome'
      },
      'bbbbbb': {
        username: 'firefox'
      },
    }
  };

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.forEach(v => {
      this.settings.gameId = v.id;
    });
  }

  closeSettings() {
    this.open = false;
  }

}
