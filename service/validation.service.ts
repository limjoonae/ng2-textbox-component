import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  getWarningMessage(warningText: string, defaultMsg: string): string {
    if(warningText != '' && warningText != null){
        return warningText;
      } else {
        return defaultMsg;
      }
  }

  validateEmail(value: string): boolean { 
    let pattern = /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/g;
    if(value != '' && !pattern.test(value)) {
        return false;
    } else { return true; }
  }

  validateInteger(value: string): boolean {
    let pattern = /^-?([0-9]\d*)$/;
    if(value != '' && !pattern.test(value)){
      return false;
    } else { return true; }
  }

  validateNumber(value: string): boolean {

    let pattern = /^-?((([0-9]\d*)(\.[0-9]\d*){0,1})|(([0])(\.[0-9]\d*){0,1}))$/;

    if(value != '' && !pattern.test(value)){
      return false;
    } else { return true; }
  }

  
}
