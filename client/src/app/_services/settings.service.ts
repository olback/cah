import { Injectable } from '@angular/core';
import { Setting } from '../_classes/setting';

// type DataType = ((a: any) => number) | ((a: any) => string);
type DataType = 'string' | 'number' | 'boolean';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public acronyms = new Setting('acronyms', 'boolean', 'Enable random acronyms');
  public eggs = new Setting('eggs', 'boolean', 'Enable easter eggs');

}
