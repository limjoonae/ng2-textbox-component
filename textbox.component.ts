import { Component, OnInit, Input } from '@angular/core';
import { SelectColorThemeService } from '../service/select-color-theme.service';
import { ValidationService } from './service/validation.service';
import { TransformService } from './service/transform.service';

@Component({
  selector: 'gos-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  providers: [ SelectColorThemeService,  ValidationService, TransformService]
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
  @Input() numberFormat: string;
  private defaultText: string;
  private colorClass: string;
  private _colorClassPrefix = 'alert alert-';
  private warningTextInput: string;
  private numeral = require('numeral');

  constructor(private _selectColorThemeService: SelectColorThemeService, 
              private _validationService: ValidationService,
              private _transformStringNumber: TransformService) { }

  ngOnInit() {
    this.colorClass = this._selectColorThemeService.getColorTheme(this._colorClassPrefix, this.colorTheme);
    this.placeholder = this.getPlaceHolder(this.placeholder);
    this.defaultText = this.getDefaultText(this.defaultValue);
  }

  getPlaceHolder(placeholderInput: string): string {
    if(placeholderInput != null) 
      return placeholderInput
    return '';
  }

  getDefaultText(defaultTextInput: string): string {
    if(defaultTextInput != null) 
      return defaultTextInput;
    return '';
  }

  validateEmail(value: string): void { 
    let isValid = this._validationService.validateEmail(value);
    if(!isValid){
      this.warningTextInput = this._validationService.getWarningMessage(this.warningText, 'please input valid email');
    } else { this.warningTextInput = ''; }
  }

  validateInteger(value: string): void {
    let isValid = this._validationService.validateInteger(value);
    if(isValid){
      this.warningTextInput = '';
      this.defaultText = this.getIntegerFormat(value);
    } else { 
      this.warningTextInput = this._validationService.getWarningMessage(this.warningText, 'please input valid number');
    }
  }

  validateNumber(value: string): void {
    let isValid = this._validationService.validateNumber(value);
    if(isValid) {
      this.warningTextInput = ''; 
      this.defaultText = this.getNumberFormat(value);
    } else { 
      this.warningTextInput = this._validationService.getWarningMessage(this.warningText, 'please input valid number');
    }
  }

  getNumberFormat(value: string): string {
    return this._transformStringNumber.toNumberFormat(value, this.numberFormat);
  }
  
  getIntegerFormat(value: string): string {
    return this._transformStringNumber.toIntegerFormat(value);
  }
  
  clearFormat(value: string): void {
    let stringToClear = /,/g;
    this.defaultText = this._transformStringNumber.toClearFormat(value, stringToClear);
  }

}
