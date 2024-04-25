
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'textbox',
  template:`
<div 
  class="grow relative bg-dark-input-bg border-2 h-96 p-2 border-slate-700"
  (dblclick)="changeEdit()"
>
  <button
    class="p-2 rounded-lg text-white bg-dark-action hover:bg-dark-action-hover absolute top-2 right-2"
    (click)="changeEdit()"
    i18n i18n-title [title]="(!editing) ? 'View' : 'Edit'" [innerHTML]="(editing)? 'View' : 'Edit'"></button>
  <textarea
    #editBox
    class="h-full w-full bg-inherit"
    *ngIf="editing"
    (input)="inputChanged($event)"
  >{{text}}</textarea>
  <markdown *ngIf="!editing" class="prose prose-neutral prose-invert" [data]="text" ngPreserveWhitespace></markdown>
</div>
`,
styles: [
  "h1 {font-weight: bold;}",
]
})
export class TextboxComponent {
  @Input() text = "";
  @Output() textChange = new EventEmitter<string>();

  editing = false

  constructor() {}

  changeEdit() {
    this.editing = !this.editing;
  }

  inputChanged(event: Event) {
    this.text = (event.target as HTMLTextAreaElement).value ?? "";
    this.textChange.emit(this.text);
  }
}
