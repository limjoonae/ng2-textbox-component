import { Injectable } from '@angular/core';

@Injectable()
export class TransformService {

  private numeral = require('numeral');

  constructor() { }

  toNumberFormat(value: string, customFormat?: string): string {
    let defaultFormat = '0,0.00';
    if(value != '')
      if(customFormat == null || customFormat == ''){
        return this.numeral(value).format(defaultFormat);
      } else {
        return this.numeral(value).format(customFormat);
      }
    return '';
  }

  toIntegerFormat(value: string): string {
    if(value != '')
      return this.numeral(value).format('0');
    return '';
  }

  toClearFormat(value: string, stringToClear: RegExp): string {
    if(value != '')
      return value.replace(stringToClear, '');
    return '';
  }

}
