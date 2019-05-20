import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

interface IEggs {
  [key: string]: (b: boolean) => void;
}

@Injectable({
  providedIn: 'root'
})
export class EasterEggService {

  constructor(private _settings: SettingsService) {
    this._settings.settings.eggs.setCb((v: boolean) => {
      if (!v) {
        this.disableAll();
      }
    });
  }

  private eggs: IEggs = {
    comicSans(enabled: boolean) {
      if (enabled) {
        document.getElementsByTagName('body')[0].classList.add('comic-sans');
      } else {
        document.getElementsByTagName('body')[0].classList.remove('comic-sans');
      }
    },
    rainbow(enabled: boolean) {
      if (enabled) {
        document.getElementsByTagName('body')[0].classList.add('rainbow');
      } else {
        document.getElementsByTagName('body')[0].classList.remove('rainbow');
      }
    }
  };

  public enable(egg: string) {
    if (this._settings.settings.eggs.get() && this.eggs.hasOwnProperty(egg)) {
      this.eggs[egg](true);
    }
  }

  public disable(egg: string) {
    if (this.eggs.hasOwnProperty(egg)) {
      this.eggs[egg](false);
    }
  }

  public disableAll() {
    // tslint:disable-next-line:forin
    for (const egg in this.eggs) {
      this.eggs[egg](false);
    }
  }

}
