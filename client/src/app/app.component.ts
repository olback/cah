import { Component, OnInit } from '@angular/core';
import { SocketService } from './_services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cah';

  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
  }

}
