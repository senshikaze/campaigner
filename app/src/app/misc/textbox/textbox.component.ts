
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { ViewInt } from '../view-int';
import { DiceRollerService } from 'src/app/services/dice-roller.service';

@Component({
  selector: 'textbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MarkdownModule,
  ],
  template:`
<div 
  class="grow h-full w-full relative p-2 bg-light-input-bg text-black dark:text-white dark:bg-dark-input-bg rounded-md"
  (dblclick)="changeEdit()"
  [class]="styleClass"
>
  <button
    class="p-2 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover absolute top-2 right-2"
    (click)="changeEdit()"
    i18n i18n-title [title]="(!editing) ? 'View' : 'Edit'" [innerHTML]="(editing)? 'View' : 'Edit'"></button>
  <textarea
    #editBox
    class="h-full w-full p-2 bg-inherit"
    *ngIf="editing; else viewBox"
    (input)="inputChanged($event)"
    [class]="styleClass"
  >{{text}}</textarea>
  <ng-template #viewBox>
    <markdown
      class="min-h-max min-w-max p-2 prose prose-neutral dark:prose-invert"
      [data]="text"
      ngPreserveWhitespace
      [disableSanitizer]="true"></markdown>
  </ng-template>
</div>
`,
styles: [
  "h1 {font-weight: bold;}",
]
})
export class TextboxComponent extends ViewInt implements OnInit {
  @Input() text = "";
  @Input() styleClass = "";
  @Output() textChange = new EventEmitter<string>();

  editing = false

  constructor(
    private markdown: MarkdownService,
    protected override diceRoller: DiceRollerService,
  ) {
    super(diceRoller);
  }

  ngOnInit(): void {
    this.markdown.renderer.text = (text: string) => {
      let rendered = text;
      text.match(/\d+d\d*[+-]\d*/i)
        ?.map(d => rendered = rendered.replace(
          d,
          `<a class="dice cursor-pointer bg-slate-400 hover:bg-slate-500 p-1 px-2 rounded-lg no-underline" dice="${d}">${d}</a>`
        ));
      return rendered;
    };
  }

  changeEdit() {
    this.editing = !this.editing;
  }

  inputChanged(event: Event) {
    this.text = (event.target as HTMLTextAreaElement).value ?? "";
    this.textChange.emit(this.text);
  }
}
