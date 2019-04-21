import { Injectable, EventEmitter } from '@angular/core';
import { Toast } from '../_classes/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _event = new EventEmitter(true);

  constructor() {
  }

  emit(toast: Toast) {
    this._event.emit(toast);
  }

  event() {
    return this._event;
  }

}
