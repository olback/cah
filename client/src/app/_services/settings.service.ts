import { Injectable } from '@angular/core';
import { Setting } from '../_classes/setting';
import { EasterEggService } from './easter-egg.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private _eggs: EasterEggService) {}

  public settings = {
    acronyms: new Setting('acronyms', 'boolean', 'Enable random acronyms (offensive)'),
    eggs: new Setting('eggs', 'boolean', 'Enable easter eggs', (v) => {
      this._eggs.disableAll();
    })
  };


}
