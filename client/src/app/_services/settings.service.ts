import { Injectable } from '@angular/core';
import { Setting } from '@class/setting';

interface ISettings {
  acronyms: Setting;
  eggs: Setting;
  scrollFactor: Setting;
  [key: string]: Setting;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settings: ISettings = {
    acronyms: new Setting('acronyms', 'Boolean', 'Enable random acronyms', true, 'May be offensive.'),
    eggs: new Setting('eggs', 'Boolean', 'Enable easter eggs', true, 'You\'re a boring human if you disable this.'),
    scrollFactor: new Setting('scrollFactor', 'Number', 'Scroll speed', 1, 'Change this to scroll through cards faster or slower. Negative values changes the direction.')
  };

  public reset() {
    for (const s in this.settings) {
      if (this.settings.hasOwnProperty(s)) {
        this.settings[s].reset();
      }
    }
  }

}
