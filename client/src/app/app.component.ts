import { Component, OnInit, DoCheck } from '@angular/core';
import { SocketService } from './_services/socket.service';
import { UsernameService } from './_services/username.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {

  username = '';

  constructor(private socketService: SocketService, private usernameService: UsernameService) {
  }

  ngOnInit() {
    this.username = this.usernameService.get();
  }

  ngDoCheck() {
    this.username = this.usernameService.get();
  }

}
