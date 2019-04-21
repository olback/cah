import { Injectable } from '@angular/core';
import { Setting } from '../_classes/setting';

// type DataType = ((a: any) => number) | ((a: any) => string);
type DataType = 'string' | 'number' | 'boolean';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  acronyms = new Setting('acronyms', 'boolean', 'Enable random acronyms');
  eggs = new Setting('eggs', 'boolean', 'Enable easter eggs');

}
