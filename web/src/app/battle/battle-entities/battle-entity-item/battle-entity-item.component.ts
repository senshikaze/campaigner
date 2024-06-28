import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BattleEntity } from 'src/app/interfaces/battle-entity';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'battle-entity-item',
  template: `
    <div class="flex border-b-2 border-b-slate-700">
      <div class="flex flex-col grow-0">
        <close-button (click)="deleted.emit(entity)" title="Delete Entity"></close-button>
        <drag-item></drag-item>
      </div>  
      <div class="basis-3/4 grow" (click)="entitySelected.emit(entity)" >
        <div *ngIf="!edit; else editable">
          <h1>{{entity.name}}</h1>
          <h1>{{entity.current_health}} / {{entity.total_health}}</h1>
          <h1>{{entity.name}}</h1>
        </div>
        <ng-template #editable>
          <input
            class="grow text-white p-2 m-2 rounded-md placeholder:text-slate-400 bg-dark-input-bg"
            [(ngModel)]="entity.name"
            i18n-title title="Entity Name"
            i18n-placeholder placeholder="Entity Name">
          <div class="flex">
            <input
              class="text-white p-2 m-2 rounded-md w-16 placeholder:text-slate-400 bg-dark-input-bg inline"
              [(ngModel)]="entity.current_health"
              i18n-title title="Current Health"
              i18n-placeholder placeholder="Current Health"
              type="number">
            <p class="text-white p-2 m-2">/</p>
            <input
              class="text-white p-2 m-2 rounded-md w-16 placeholder:text-slate-400 bg-dark-input-bg inline"
              [(ngModel)]="entity.total_health"
              i18n-title title="Total Health"
              i18n-placeholder placeholder="Total Health"
              type="number">
          </div>
          <input
            class="grow text-white p-2 m-2 rounded-md placeholder:text-slate-400 bg-dark-input-bg"
            [(ngModel)]="entity.initiative"
            i18n-title title="Initiative"
            i18n-placeholder placeholder="Initiative"
            type="number">
        </ng-template>
      </div>
      <div class="basis-1/4 grow-0">
        <health-picker [maxHealth]="entity.total_health" [(currentHealth)]="entity.current_health"></health-picker>
      </div>
    </div>
  `,
  styles: []
})
export class BattleEntityItemComponent implements OnDestroy, OnInit {
  @Input() entity!: BattleEntity;
  @Output() entitySelected = new EventEmitter<BattleEntity>();
  @Output() deleted = new EventEmitter<BattleEntity>();

  edit = false;

  destroy$ = new Subject<boolean>();
  constructor(
    private store: StoreService
  ) {}

  ngOnInit(): void {
    if (!this.entity.id) {
      this.edit = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onHealthChanged(health: number): void {
    this.entity.current_health = health;
    this.store.saveBattleEntity(this.entity).pipe(
      takeUntil(this.destroy$)
    ).subscribe(e => this.entity = e);
  }  
}
