import { Component, OnInit, Input } from '@angular/core';
import { SelectColorThemeService } from '../service/select-color-theme.service';

@Component({
  selector: 'gos-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  providers: [ SelectColorThemeService ]
})
export class TextboxComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() type: string;
  @Input() label: string;
  @Input() require: string;
  @Input() disable: string;
  @Input() readonly: string;
  @Input() maxlength: string;
  @Input() defaultValue: string;
  @Input() placeholder: string;
  @Input() colorTheme: string;
  @Input() warningText: string;
  private defaultText: string;
  private colorClass: string;
  private _colorClassPrefix = 'alert alert-';
  private warningTextInput: string;

  constructor(private _selectColorThemeService: SelectColorThemeService) { }

  ngOnInit() {
    this.colorClass = this._selectColorThemeService.getColorTheme(this._colorClassPrefix, this.colorTheme);
    this.placeholder = this.getPlaceHolder(this.placeholder);
    this.defaultText = this.getDefaultText(this.defaultValue);
  }

  getPlaceHolder(placeholderInput: string) {
    if(placeholderInput != null) 
      return placeholderInput
    return '';
  }

  getDefaultText(defaultTextInput: string) {
    if(defaultTextInput != null) 
      return defaultTextInput
    return '';
  }

  getWarningMessage(defaultMsg: string) {
    if(this.warningText != '' && this.warningText != null){
        this.warningTextInput = this.warningText;
      } else {
        this.warningTextInput = defaultMsg;
      }
  }

  validateEmail(value) { 
    let pattern = /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/g;
    if(value != '' && !pattern.test(value)) {
        this.getWarningMessage('please input valid email');
    } else {
        this.warningTextInput = '';
    }
  }

  validateNumber(value: string): boolean {
    let pattern = /^[1-9]\d*$/;
    if(value != '' && !pattern.test(value)) {
        this.getWarningMessage('please input valid number');
        return false;
    } else {
        this.warningTextInput = '';
        return true;
    }
  }

  validateNumberIncludeZero(value: string): boolean {
    let pattern = /^[0-9]\d*$/;
    if(value != '' && !pattern.test(value)) {
        this.getWarningMessage('please input valid number');
        return false;
    } else {
        this.warningTextInput = '';
        return true;
    }
  }

  validateCurrency(value: string){
    if(value != '') {
      let indexOfPoint = value.indexOf('.');
      let beforePoint = value.substring(0, indexOfPoint);
      let afterPoint = value.substring(indexOfPoint + 1);
      let afterWithPoint = value.substring(indexOfPoint);
      // alert('beforePoint : '+beforePoint);
      // alert('afterPoint : '+afterPoint);
      //000,111.222
      let isValidBeforePoint: boolean;
      let isValidAfterPoint = this.validateNumberIncludeZero(afterPoint);
      let firstChar = value.substring(0, 3);

      let numberRegEx = /(\d)(?=(\d{3})+(?!\d))/g;
      let replaceStr = "$1,";
      let warningMsg = 'please input valid number';

      let isFloatingNumber = true;
      if(beforePoint == '') {
        isFloatingNumber = false;
      }

      if(isFloatingNumber) {
        let valueFloat = parseFloat(value);
        if(isValidAfterPoint) {
          if(valueFloat > -1 && valueFloat < 0) { 
            // alert('Hiii');
              this.defaultText = beforePoint.concat(afterWithPoint);
          } else if(valueFloat == 0) {
              isValidBeforePoint = this.validateNumber(beforePoint);
              if(beforePoint.substring(0, 1) == '-' || !isValidBeforePoint) {
                  this.warningTextInput = warningMsg;
              } else { 
                  this.defaultText = value; 
              }
              // alert('equal 0');
          } else if(valueFloat > 0 && valueFloat < 1) {
              if(beforePoint.substring(0) == '0') {
                // alert('beforePoint.substring(0) : '+beforePoint.substring(0));
                this.defaultText = beforePoint.concat(afterWithPoint);
              } else {
                  isValidBeforePoint = this.validateNumber(beforePoint);
                  if(isValidBeforePoint) {
                    // alert('beforePointxx : '+beforePoint);
                    this.defaultText = beforePoint.replace(numberRegEx, replaceStr).concat(afterWithPoint);
                  }
              }
              // alert('in range 0-1'); 
          } else if(valueFloat >= 1) { 
              isValidBeforePoint = this.validateNumber(beforePoint);
              if(isValidBeforePoint) {
                // alert('float > 1 beforePoint : '+beforePoint);
                this.defaultText = beforePoint.replace(numberRegEx, replaceStr).concat(afterWithPoint);
              }
              // alert('1 or more');
          } else { 
              let beforePointNumberOnly = beforePoint.substring(1);
              isValidBeforePoint = this.validateNumber(beforePointNumberOnly);
              if(isValidBeforePoint) {
                this.defaultText = '-' + beforePointNumberOnly.replace(numberRegEx, replaceStr).concat(afterWithPoint);
              }
              // alert('less than -1'); 
          }
        }

      } else {
        // alert('value : '+value);
        let valueInt = parseInt(value);
        if(valueInt > 0) {
          isValidBeforePoint = this.validateNumber(value);
          if(isValidBeforePoint) {
            this.defaultText = value.replace(numberRegEx, replaceStr);
          }
          // alert(valueInt + ' more than 0');
        } else if(valueInt < 0) {
            let valueNumberOnly = value.substring(1);
            isValidBeforePoint = this.validateNumber(valueNumberOnly);
            if(isValidBeforePoint) {
              this.defaultText = value;
            }
            // alert(valueInt + ' less than 0');
        }
      }

    } else {
      this.warningTextInput = '';
    }
  }
  
  clearFormat(value: string) {
    if(value != '') {
      this.defaultText = value.replace(/,/g, "");
    }
  }

}
