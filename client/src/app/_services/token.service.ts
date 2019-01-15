import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private _gen(len = 20): string {

    let s = '';

    for (let i = 0; i < len; i++) {

      s += String.fromCharCode(Math.floor((Math.random() * 26) + 97));

    }

    return s;

  }

  isSet(): boolean {

    return !!localStorage.getItem('token');

  }

  get() {

    if (this.isSet()) {

      return localStorage.getItem('token');

    } else {

      const t = this._gen();
      localStorage.setItem('token', t);
      return t;

    }

  }

}
