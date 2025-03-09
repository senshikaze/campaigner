import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Battle } from 'src/app/interfaces/battle';
import { Campaign } from 'src/app/interfaces/campaign';
import { StoreService } from 'src/app/services/store.service';
import { InputComponent } from "../../input/input.component";
import { TextboxComponent } from "../../textbox/textbox.component";
import { SaveButtonComponent } from "../../save-button/save-button.component";
import { StatsComponent } from "../stats/stats.component";
import { InfoIconComponent } from "../../info-icon/info-icon.component";
import { take } from 'rxjs';
import { Entity } from 'src/app/interfaces/entity';
import { EntityType } from 'src/app/enums/entity-type';

@Component({
  selector: 'battle-entity-entry',
  standalone: true,
  imports: [InputComponent, TextboxComponent, SaveButtonComponent, StatsComponent, InfoIconComponent],
  template: `
    <div class="grow flex flex-col p-2">
      <div>
        <label for="name">Name:</label>
        <div>
          <cInput [(value)]="entity.name" styleClass="m-2 w-2/3"></cInput>
        </div>
      </div>
      <div>
        <label for="health">Health</label>
        <div>
          <cInput
            [(value)]="entity.total_health"
            styleClass="m-2"
            inputType="number"
            (valueChange)="entity.current_health = $event"
          ></cInput>
        </div>
      <div>
      <div>
        <label for="initiative">Initiative</label>
        <div>
          <cInput
            [(value)]="entity.initiative"
            styleClass="m-2"
            inputType="number"
            (valueChange)="entity.initiative = $event"
          ></cInput>
        </div>
      <div>
      <div>
        <label for="initiative">
          Player Character <info-icon title="Allows Current Health to drop below zero."></info-icon>
        </label>
        <div>
          <cInput
            [(value)]="entity.allows_negative"
            styleClass="m-2"
            inputType="checkbox"
            (valueChange)="entity.allows_negative = $event"
          ></cInput>
        </div>
      <div>
      <div>
        <label for="description">Description</label>
        <div>
          <textbox
            [(text)]="entity.description"
            id="description"
            [editing]="true"
            styleClass="m-2 h-60 w-2/3"
            [showView]="false"></textbox>
        </div>
      </div>
      <div>
        <label for="notes">Notes <info-icon title="Private notes only shown in Almanac"></info-icon></label>
        <div>
          <textbox
            [(text)]="entity.notes"
            id="notes"
            [editing]="true"
            styleClass="m-2 h-60 w-2/3"
            [showView]="false"></textbox>
        </div>
      </div>
      <div class="w-2/3">
        <h2 class="text-xl">Stats</h2>
        <stats-entry [(stats)]="entity.stats"></stats-entry>
      <div>
        <save-button (clicked)="save(entity)" text="Save"></save-button>
      </div>
    </div>

  `,
  styles: []
})
export class BattleEntityComponent implements OnInit {
  @Input() entity!: Entity;
  @Input() battle!: Battle;
  @Input() campaign!: Campaign;

  @Output() entityChanged = new EventEmitter<Entity>();
  @Output() saved = new EventEmitter<Entity>();

  constructor (
    private store: StoreService
  ) {}

  ngOnInit(): void {
    if (!this.entity && this.battle) {
      this.entity = {
        name: "",
        type: EntityType.NPC,
        description: "",
        notes: "",
        total_health: 0,
        current_health: 0,
        allows_negative: false,
        campaign_id: this.campaign?.id,
        battle_id: this.battle?.id,
        stats: {
          ac: 0,
          speed: 0,
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0
        }
      };
    } 
  }

  save(entity: Entity): void {
    this.store.saveEntity(entity).pipe(
      take(1)
    ).subscribe(e => this.saved.emit(e));
  }

}
