
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'textbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MarkdownModule
  ],
  template:`
<div 
  class="grow h-full w-full relative p-2 bg-light-input-bg dark:bg-dark-input-bg rounded-md"
  (dblclick)="changeEdit()"
  [class]="styleClass"
>
  <button
    class="p-2 rounded-md text-white dark:bg-dark-action dark:hover:bg-dark-action-hover absolute top-2 right-2"
    (click)="changeEdit()"
    i18n i18n-title [title]="(!editing) ? 'View' : 'Edit'" [innerHTML]="(editing)? 'View' : 'Edit'"></button>
  <textarea
    #editBox
    class="h-full w-full p-2 bg-inherit"
    *ngIf="editing; else viewBox"
    (input)="inputChanged($event)"
  >{{text}}</textarea>
  <ng-template #viewBox>
    <markdown class="min-h-max min-w-max p-2 prose prose-neutral prose-invert" [data]="text" ngPreserveWhitespace></markdown>
  </ng-template>
</div>
`,
styles: [
  "h1 {font-weight: bold;}",
]
})
export class TextboxComponent {
  @Input() text = "";
  @Input() styleClass = "";
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
