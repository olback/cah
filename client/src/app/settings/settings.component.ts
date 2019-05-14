import { Component, Output, EventEmitter } from '@angular/core';
import { SettingsService } from '../_services/settings.service';
import { Setting } from '../_classes/setting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  @Output() close = new EventEmitter(true);

  settings: Setting[] = [];

  constructor(public settingsService: SettingsService) {

    // tslint:disable-next-line:forin
    for (const s in settingsService.settings) {
      this.settings.push(settingsService.settings[s]);
    }

  }

  closeSettings() {
    this.close.emit();
  }

}
