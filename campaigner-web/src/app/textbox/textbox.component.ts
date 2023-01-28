
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';

@Component({
  selector: 'ck-textbox',
  template:`
<div class="grow">
  <ckeditor
      [data]="text"
      (dataChange)="onDataChanged($event)"
      [config]="{toolbar: [['Bold', 'Italic', 'Underline'], ['NumberedList', 'BulletedList'], ['Styles', 'Format'], ['Link']], resize_enabled: false, removePlugins: 'elementspath', extraPlugins: 'autogrow'}">
  </ckeditor>
</div>`
})
export class TextboxComponent {
  @Input() text = "";
  @Output() textChange = new EventEmitter<string>();

  constructor() {}

  onDataChanged(event: CKEditor4.EventInfo) {
    // @ts-ignore
    this.text = event;
    this.textChange.emit(this.text);
  }
}
