
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'ck-textbox',
  template:`
<div class="grow">
  <ckeditor
      class="text-black"
      [editor]="editor"
      [data]="text"
      (change)="onDataChanged($event)"
      [config]="{
        toolbar: ['Bold','Italic', '|', 'heading', '|', 'NumberedList', 'BulletedList', 'blockQuote', 'Link'],
        removePlugins: ['elementspath'],
      }">
  </ckeditor>
</div>`
})
export class TextboxComponent {
  @Input() text = "";
  @Output() textChange = new EventEmitter<string>();

  editor = ClassicEditor;
  constructor() {}

  onDataChanged({ editor }: ChangeEvent) {
    this.textChange.emit(editor.data.get());
  }
}
