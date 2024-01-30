
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'ck-textbox',
  template:`
<div class="grow">
  <ckeditor
      [editor]="editor"
      [data]="text"
      (dataChange)="onDataChanged($event)"
      [config]="{
        toolbar: ['Bold','Italic', 'Underline', 'NumberedList', 'BulletedList', 'Styles', 'Format', 'Link'],
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

  onDataChanged(event: Event) {
    // @ts-ignore
    this.text = event.text;
    this.textChange.emit(this.text);
  }
}
