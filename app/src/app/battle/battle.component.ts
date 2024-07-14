import { Component, OnInit } from '@angular/core';
import { Battle } from '../interfaces/battle';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Observable, Subject, of, take } from 'rxjs';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'battle',
  template:`
  <div class="flex flex-col grow p-2 h-full" *ngIf="battle$ | async as battle">
    <div class="overflow-y-scroll grid grid-flow-col gird-cols-12 grow">
        <div class="grow col-span-2 flex flex-col">
            <div class="flex border-b-2 border-slate-400 dark:border-slate-700">
                <div class="mb-2 flex flex-auto">
                  <cInput
                    class="grow"
                    [(value)]="battle.name"
                    title="Battle Title"
                    placeholder="Battle Title"></cInput>
                    <save-button
                      (click)="onSaveClicked(battle)"
                      title="Save Battle"></save-button>
                </div>
            </div>
            <battle-entities
              class="grow"
              [battle]="battle"
              [saveEvent]="saveEvent.asObservable()"></battle-entities>
        </div>
    </div>
</div>
  `,
  styles: []
})
export class BattleComponent implements OnInit {
  battle$!: Observable<Battle>;

  saveEvent = new Subject<Battle>();

  constructor (
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      if (p.has('id') && p.get('id') != "new") {
        this.battle$ = this.store.getBattle(Number.parseInt(p.get("id") ?? ''));
      } else {
        this.battle$ = of({
          name: ''
        });
      }
    })
  }

  onSaveClicked(battle: Battle): void {
    if (battle.id != undefined) {
      this.battle$ = this.store.saveBattle(battle);
    } else {
      this.store.saveBattle(battle).pipe(
        take(1)
      ).subscribe(b => this.router.navigate(["/battles", b.id]));
    }
  }
}
