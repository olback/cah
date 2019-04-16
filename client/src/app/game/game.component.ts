import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  open = false;
  gameId = '';
  settings = {
    aa: 'Hello'
  };

  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    console.log('params: ', this._route.params.forEach(v => {
      this.gameId = v.id;
    }));
  }

  closeSettings() {
    this.open = false;
  }

}
