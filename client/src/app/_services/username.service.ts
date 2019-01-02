import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  username = '';

  constructor() { }

  set(username: string) {

    localStorage.setItem('username', username);

  }

  get() {

    return localStorage.getItem('username');

  }

}
