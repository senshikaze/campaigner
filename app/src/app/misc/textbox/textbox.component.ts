
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { ViewInt } from '../view-int';
import { DiceRollerService } from 'src/app/services/dice-roller.service';
import { EntityType } from 'src/app/enums/entity-type';
import { renderDiceRoll, renderRollStatModifier, renderStatsBlock } from './renderers';
import { Entity } from 'src/app/interfaces/entity';
import { keyToStat, scoreToModifier, statToString, StatType } from 'src/app/enums/stats';

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
  class="relative p-2 bg-light-input-bg text-black dark:text-white dark:bg-dark-input-bg rounded-md overflow-auto"
  [class]="styleClass"
>
  @if (editing) {
    <textarea
      #editBox
      class="h-full w-full bg-inherit"
      (input)="inputChanged($event)"
      (dblclick)="changeEdit()"
    >{{text}}</textarea>
  } @else {
    <markdown
      class="h-full w-full prose prose-neutral dark:prose-invert"
      [data]="text"
      ngPreserveWhitespace
      [disableSanitizer]="true"
      (dblclick)="changeEdit()"></markdown>
  }
  <button
    class="p-2 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover absolute top-2 right-2"
    (click)="changeEdit()"
    i18n i18n-title [title]="(!editing) ? 'View' : 'Edit'" [innerHTML]="(editing)? 'View' : 'Edit'"></button>
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
      text.match(/\d+d\d*[+-]\d*/i)?.map(d => rendered = rendered.replace(d, renderDiceRoll(d)));
      if (this.entity) {
        // stat block
        text.match(/\$stats/i)
          ?.map(text => {
            if (this.entity.type === EntityType.BATTLE) {
              rendered = rendered.replace(text, renderStatsBlock(this.entity))
              }
          });
        let statRoll = text.match(/\$atk(\w*)/);
        if (statRoll) {
          let stat = keyToStat(statRoll[1]);
          if (this.entity.type === EntityType.BATTLE && stat !== undefined) {
            let modifier = scoreToModifier(this.entity.stats?.[stat as keyof typeof this.entity.stats] ?? 0);
            rendered = rendered.replace(statRoll[0], renderRollStatModifier(this.entity, "1d20", modifier, "Attack"));
          }
        };
      }
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
