import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ToastService } from '../_services/toast.service';
import { Toast } from '../_classes/toast';

@Component({
  selector: 'app-in-game-settings',
  templateUrl: './in-game-settings.component.html',
  styleUrls: ['./in-game-settings.component.scss']
})
export class InGameSettingsComponent implements OnInit {

  @Input() game: ISocket.GameState.State;
  @Output() close = new EventEmitter(true);

  hidePassword = true;

  constructor(
    private _clipboardService: ClipboardService,
    private _toastService: ToastService
    ) { }

  ngOnInit() {
  }

  closeSettings() {
    this.close.emit();
  }

  formatTime() {

    if (this.game.settings.timeout === 0) {
      return 'Unlimited';
    } else if (this.game.settings.timeout < 61) {
      return '60 seconds';
    } else {
      return `${Math.floor(this.game.settings.timeout / 60)} minutes, ${this.game.settings.timeout % 60} seconds`;
    }

  }

  copyUrl() {
    const url = `${origin.toString()}/join/${this.game.gid}`;
    console.log(url);
    if (this._clipboardService.copyFromContent(url)) {
      this._toastService.emit(new Toast('URL copied to clipboard.'));
    } else {
      this._toastService.emit(new Toast('Failed to copy URL to clipboard.'));
    }
  }

}
