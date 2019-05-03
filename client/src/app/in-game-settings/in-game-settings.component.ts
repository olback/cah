import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-in-game-settings',
  templateUrl: './in-game-settings.component.html',
  styleUrls: ['./in-game-settings.component.scss']
})
export class InGameSettingsComponent implements OnInit {

  @Input() game: ISocket.GameState.State;
  @Output() close = new EventEmitter(true);

  constructor() { }

  ngOnInit() {
  }

  closeSettings() {
    this.close.emit();
  }

  formatTime() {

    if (this.game.timeout === 0) {
      return 'Unlimited';
    } else if (this.game.timeout < 61) {
      return '60 seconds';
    } else {
      return `${Math.floor(this.game.timeout / 60)} minutes, ${this.game.timeout % 60} seconds`;
    }

  }

}
