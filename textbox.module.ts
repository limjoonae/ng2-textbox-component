import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from '../label/index';
import { CustomDisabledDirective, CustomReadonlyDirective, CustomMaxlengthDirective } from '../directive/index';
import { TextboxComponent } from './textbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TextboxComponent,
    LabelComponent,
    CustomDisabledDirective, 
    CustomReadonlyDirective, 
    CustomMaxlengthDirective,
  ]
})
export class TextboxModule { }
