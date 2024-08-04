import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stats } from 'src/app/interfaces/stats';
import { InputComponent } from "../../input/input.component";

@Component({
  selector: 'stats-entry',
  standalone: true,
  imports: [InputComponent],
  template: `
  @if (stats) {
    <div class="flex flex-row flex-wrap">
      <div>
        <label for="defense">Defense:</label>
        <div>
          <cInput [(value)]="stats.defense" inputType="number" styleClass="m-2 w-40"></cInput>
        </div>
      </div>
      <div>
        <label for="speed">Speed:</label>
        <div>
          <cInput [(value)]="stats.speed" inputType="number" styleClass="m-2 w-40"></cInput>
        </div>
      </div>
      <div>
        <label for="strength">Strength:</label>
        <div>
          <cInput [(value)]="stats.strength" inputType="number" styleClass="m-2 w-40"></cInput>
        </div>
      </div>
      <div>
        <label for="dexterity">Dexterity:</label>
        <div>
          <cInput [(value)]="stats.dexterity" inputType="number" styleClass="m-2 w-40"></cInput>
        </div>
      </div>
      <div>
        <label for="constitution">Constitution:</label>
        <div>
          <cInput [(value)]="stats.constitution" inputType="number" styleClass="m-2 w-40"></cInput>
        </div>
      </div>
      <div>
        <label for="intelligence">Intelligence:</label>
        <div>
          <cInput [(value)]="stats.intelligence" inputType="number" styleClass="m-2 w-40"></cInput>
        </div>
      </div>
      <div>
        <label for="wisdom">Wisdom:</label>
        <div>
          <cInput [(value)]="stats.wisdom" inputType="number" styleClass="m-2 w-40"></cInput>
        </div>
      </div>
      <div>
        <label for="charisma">Charisma:</label>
        <div>
          <cInput [(value)]="stats.charisma" inputType="number" styleClass="m-2 w-40"></cInput>
        </div>
      </div>
    </div>
  }
  `,
  styles: ``
})
export class StatsComponent {
  @Input() stats!: Stats | undefined;
  @Output() statsChange = new EventEmitter<Stats>();
}
