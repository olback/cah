import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  open = false;
  settings = {
    aa: 'Hello'
  };

  constructor() { }

  ngOnInit() {
  }

  closeSettings() {
    this.open = false;
  }

}
