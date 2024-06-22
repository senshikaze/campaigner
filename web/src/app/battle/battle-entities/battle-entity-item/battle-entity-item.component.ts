import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BattleEntity } from 'src/app/interfaces/battle-entity';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'battle-entity-item',
  template: `
    <div (click)="entitySelected.emit(entity)">
      <h1 *ngIf="!edit">{{entity.name}}</h1>
      <input [(ngModel)]="entity.name">
      <health-picker [maxHealth]="entity.total_health" [(currentHealth)]="entity.current_health"></health-picker>
    </div>
  `,
  styles: []
})
export class BattleEntityItemComponent implements OnDestroy, OnInit {
  @Input() entity!: BattleEntity;
  @Output() entitySelected = new EventEmitter<BattleEntity>();

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
