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

  validateEmail(value: string, warningText?: string): string { 
    let pattern = /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/g;
    if(value != '' && !pattern.test(value)) {
        return this.getWarningMessage(warningText, 'please input valid email');
    } else {
        return '';
    }
  }

  validateNumber(value: string): boolean {
    let pattern = /^[1-9]\d*$/;
    if(value != '' && !pattern.test(value)) {
        return false;
    } else {
        return true;
    }
  }

  validateNumberIncludeZero(value: string): boolean {
    let pattern = /^[0-9]\d*$/;
    if(value != '' && !pattern.test(value)) {
        return false;
    } else {
        return true;
    }
  }

  validateCurrency(value: string): {} {
    let defaultText = value;
    let warningTextInput = 'please input valid number';
    let validateResultList = {};

    if(value != '') {
      let indexOfPoint = value.indexOf('.');
      let beforePoint = value.substring(0, indexOfPoint);
      let afterPoint = value.substring(indexOfPoint + 1);
      let afterWithPoint = value.substring(indexOfPoint);

      let isValidBeforePoint: boolean;
      let isValidAfterPoint = this.validateNumberIncludeZero(afterPoint);
      let firstChar = value.substring(0, 3);

      let numberRegEx = /(\d)(?=(\d{3})+(?!\d))/g;
      let replaceStr = "$1,";

      let isFloatingNumber = true;
      if(beforePoint == '') {
        isFloatingNumber = false;
      }

      if(isFloatingNumber) {
        let valueFloat = parseFloat(value);
        if(isValidAfterPoint) {
          if(valueFloat > -1 && valueFloat < 0) { 
              defaultText = beforePoint.concat(afterWithPoint);
              warningTextInput = '';
          } else if(valueFloat == 0) {
              isValidBeforePoint = this.validateNumber(beforePoint);
              if(beforePoint.substring(0, 1) != '-' && isValidBeforePoint) {
                  defaultText = value;
                  warningTextInput = ''; 
              }
          } else if(valueFloat > 0 && valueFloat < 1) {
              if(beforePoint.substring(0) == '0') {
                  defaultText = beforePoint.concat(afterWithPoint);
                  warningTextInput = '';
              } else {
                  isValidBeforePoint = this.validateNumber(beforePoint);
                  if(isValidBeforePoint) {
                      defaultText = beforePoint.replace(numberRegEx, replaceStr).concat(afterWithPoint);
                      warningTextInput = '';
                  }
              }
          } else if(valueFloat >= 1) { 
              isValidBeforePoint = this.validateNumber(beforePoint);
              if(isValidBeforePoint) {
                defaultText = beforePoint.replace(numberRegEx, replaceStr).concat(afterWithPoint);
                warningTextInput = '';
              }
          } else { 
              let beforePointNumberOnly = beforePoint.substring(1);
              isValidBeforePoint = this.validateNumber(beforePointNumberOnly);
              if(isValidBeforePoint) {
                defaultText = '-' + beforePointNumberOnly.replace(numberRegEx, replaceStr).concat(afterWithPoint);
                warningTextInput = '';
              }
          }
        }

      } else {
        let valueInt = parseInt(value);
        if(valueInt > 0) {
          isValidBeforePoint = this.validateNumber(value);
          if(isValidBeforePoint) {
            defaultText = value.replace(numberRegEx, replaceStr);
            warningTextInput = '';
          }
        } else if(valueInt < 0) {
            let valueNumberOnly = value.substring(1);
            isValidBeforePoint = this.validateNumber(valueNumberOnly);
            if(isValidBeforePoint) {
              defaultText = value;
              warningTextInput = '';
            }
        }
      }

    } else {
      warningTextInput = '';
    }

    validateResultList = { 'defaultText': defaultText, 'warningTextInput': warningTextInput }
    return validateResultList;
  }

  
}
