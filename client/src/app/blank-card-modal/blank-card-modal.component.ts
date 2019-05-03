import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blank-card-modal',
  templateUrl: './blank-card-modal.component.html',
  styleUrls: ['./blank-card-modal.component.scss']
})
export class BlankCardModalComponent implements OnInit {

  @Output() close = new EventEmitter(true);
  @Output() send = new EventEmitter(true);

  text = '';

  constructor() { }

  ngOnInit() {
  }

  closeAndSend() {
    this.send.emit(this.text);
  }

  closeModal() {
    this.close.emit();
  }

}
