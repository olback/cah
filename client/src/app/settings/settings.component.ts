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

  constructor(private _settingsService: SettingsService) {

    // tslint:disable-next-line:forin
    for (const s in _settingsService.settings) {
      this.settings.push(_settingsService.settings[s]);
    }

  }

  closeSettings() {
    this.close.emit();
  }

  resetSettings() {
    this._settingsService.reset();
  }

}
