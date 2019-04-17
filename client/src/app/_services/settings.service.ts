import { Injectable } from '@angular/core';

// type DataType = ((a: any) => number) | ((a: any) => string);
type DataType = 'string' | 'number' | 'boolean';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  set(property: string, value: string) {
    localStorage.setItem(property, value);
  }

  get(property: string, type: DataType = 'string') {

    const data = localStorage.getItem(property);

    if (type === 'boolean') {

      return data === 'true';

    } else if (type === 'number') {

      return Number(data);

    } else {

      return data;

    }

  }

}
