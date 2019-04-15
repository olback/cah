import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-in-game-settings',
  templateUrl: './in-game-settings.component.html',
  styleUrls: ['./in-game-settings.component.scss']
})
export class InGameSettingsComponent implements OnInit {

  @Input() settings: any;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeSettings() {
    this.close.emit();
  }

}
