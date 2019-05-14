import { Injectable } from '@angular/core';
import { Setting } from '../_classes/setting';
import { EasterEggService } from './easter-egg.service';

interface ISettings {
  [key: string]: Setting;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private _eggs: EasterEggService) {}

  public settings: ISettings = {
    acronyms: new Setting('acronyms', 'Boolean', 'Enable random acronyms (offensive)'),
    eggs: new Setting('eggs', 'Boolean', 'Enable easter eggs', () => {
      this._eggs.disableAll();
    })
  };

}
