import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-in-game-settings',
  templateUrl: './in-game-settings.component.html',
  styleUrls: ['./in-game-settings.component.scss']
})
export class InGameSettingsComponent implements OnInit {

  @Input() settings: GameSettings;
  @Output() close = new EventEmitter(true);

  constructor() { }

  ngOnInit() {
  }

  closeSettings() {
    this.close.emit();
  }

  formatTime() {

    if (this.settings.timeout === 0) {
      return 'Unlimited';
    } else if (this.settings.timeout < 61) {
      return '61 seconds';
    } else {
      return `${Math.floor(this.settings.timeout / 60)} minutes, ${this.settings.timeout % 60} seconds`;
    }

  }

}
