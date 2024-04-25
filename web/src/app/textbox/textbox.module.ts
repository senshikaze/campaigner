import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextboxComponent } from './textbox.component';
import { MARKED_OPTIONS, MarkdownModule } from 'ngx-markdown';


@NgModule({
    declarations: [
      TextboxComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      MarkdownModule.forChild()
    ],
    exports: [
      TextboxComponent
    ],
    providers: [
    ]
  })
  export class TextBoxModule { }