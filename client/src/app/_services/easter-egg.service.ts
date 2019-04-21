import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EasterEggService {

  private eggs = {
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
    // Read directly from localStorage to avoid circular dependencies
    if (localStorage.getItem('eggs') === 'true' && this.eggs.hasOwnProperty(egg)) {
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
