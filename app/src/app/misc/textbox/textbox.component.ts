
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { ViewInt } from '../view-int';
import { DiceRollerService } from 'src/app/services/dice-roller.service';
import { EntityType, hasStats } from 'src/app/enums/entity-type';
import { renderDiceRoll, renderRollStatModifier, renderStat, renderStatsBlock } from './renderers';
import { Entity } from 'src/app/interfaces/entity';
import { keyToStat, scoreToModifier } from 'src/app/enums/stats';

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
  class="relative bg-light-input-bg text-black dark:text-white dark:bg-dark-input-bg rounded-md overflow-auto cursor-text"
  [class]="styleClass"
>
  @if (editing) {
    <textarea
      #editBox
      class="h-full p-2 w-full bg-inherit block bg-light-input-bg-edit dark:bg-dark-input-bg-edit"
      (input)="inputChanged($event)"
      (keyup)="onKeyup($event)"
      (dblclick)="changeEdit()"
      [value]="text"
    ></textarea>
  } @else {
    <markdown
      class="h-full min-h-full min-w-full w-full prose prose-neutral dark:prose-invert"
      [data]="text"
      ngPreserveWhitespace
      [disableSanitizer]="true"
      (dblclick)="changeEdit()"></markdown>
  }
  <button
    *ngIf="showView"
    class="p-2 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover absolute top-2 right-2"
    (click)="changeEdit()"
    i18n i18n-title
    [title]="(!editing) ? 'View' : 'Edit'"
    [innerHTML]="(editing)? 'View' : 'Edit'"></button>
</div>
`,
styles: [
  "h1 {font-weight: bold;}",
]
})
export class TextboxComponent extends ViewInt implements OnInit {
  @Input() text = "";
  @Input() styleClass = "";
  @Input() editing = false;
  @Input() entity!: Entity;
  @Input() showView = true;
  @Output() textChange = new EventEmitter<string>();


  constructor(
    private markdown: MarkdownService,
    protected override diceRoller: DiceRollerService,
  ) {
    super(diceRoller);
  }

  ngOnInit(): void {
    this.markdown.renderer.text = (text: string) => {
      let rendered = text;
      text.match(/\d+d\d+[+-]\d*/gi)?.map(d => rendered = rendered.replace(d, renderDiceRoll(d)));
      if (this.entity) {
        // stat block
        text.match(/\$stats/i)
          ?.map(text => {
            if (hasStats(this.entity.type)) {
              rendered = rendered.replace(text, renderStatsBlock(this.entity))
              }
          });
        // indvidual stats
        let statMatch = text.match(/\$(str|dex|con|int|wis|cha|ac|speed)/i);
        if (statMatch) {
          let stat = statMatch[1];
          if (hasStats(this.entity.type) && stat !== undefined) {
            rendered = rendered.replace(text, renderStat(this.entity, stat));
          }
        }
        // stat roll
        let statRoll = text.match(/\$atk(\w*)/);
        if (statRoll) {
          let stat = keyToStat(statRoll[1]);
          if (hasStats(this.entity.type) && stat !== undefined) {
            let modifier = scoreToModifier(this.entity.stats?.[stat as keyof typeof this.entity.stats] ?? 0);
            rendered = rendered.replace(statRoll[0], renderRollStatModifier(this.entity, "1d20", modifier, "Attack"));
          }
        };
      }
      return rendered;
    };
  }

  changeEdit() {
    if (this.showView) {
      this.editing = !this.editing;
    }
  }

  inputChanged(event: Event) {
    this.text = (event.target as HTMLTextAreaElement).value ?? "";
    this.textChange.emit(this.text);
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key == "Enter") {
      // check the first character of the previous line
      // for a character that starts a list (`*`) If it does,
      // inject a new asterick after the newline iff there are any
      // other characters on the line, otherwise inject nothing
      const selection = (event.target as HTMLTextAreaElement).selectionStart;
      const lines = this.text.slice(0, selection).split("\n");
      if (lines.length <= 0) {
        return;
      }
      let count = 0;
      let lineNum = -1;
      for (let [key, line] of lines.entries()) {
        if (count <= selection - 1 && (count = count + (line.length + 1)) >= selection) {
          lineNum = key;
          break;
        }
      }
      if (lineNum <= 0) {
        return;
      }
      if (lines[lineNum].trim()[0] != "*") {
        return;
      }
      if (lines[lineNum].trim().length > 1) {
        this.text = this.text.slice(0, selection) + `* `;
        return;
      }
      if (lines[lineNum].trim().length == 1) {
          // remove the current line before new line is inserted
          this.text = this.text.slice(0, selection - 3) + '\n';
          return;
      }
    }
  }
}
