import { Injectable } from '@angular/core';

type DataType = ((a: any) => number) | ((a: any) => string) | ((a: any) => boolean);

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }


  set(property: string, value: string) {
    localStorage.setItem(property, value);
  }

  get(property: string, type: DataType = String) {

    return type(localStorage.getItem(property));

  }

}
