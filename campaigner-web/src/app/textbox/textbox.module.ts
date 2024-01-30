import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextboxComponent } from '../textbox/textbox.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'


@NgModule({
    declarations: [
      TextboxComponent
    ],
    imports: [
      CommonModule,
      CKEditorModule,
      FormsModule
    ],
    exports: [
      TextboxComponent
    ]
  })
  export class TextBoxModule { }