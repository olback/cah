import { Component, OnInit } from '@angular/core';
import { UsernameService } from '../_services/username.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  username: string;

  constructor(private usernameService: UsernameService) { }

  ngOnInit() {
    this.username = this.usernameService.get();
  }

  setUsername() {
    this.usernameService.set(this.username);
  }

}
