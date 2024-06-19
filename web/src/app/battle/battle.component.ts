import { Component, OnInit } from '@angular/core';
import { Battle } from '../interfaces/battle';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-battle',
  template:`
  <div class="flex flex-col grow p-2 h-full" *ngIf="battle$ | async as battle">
    <div class="overflow-y-scroll grid grid-flow-col gird-cols-12 grow">
        <div class="grow col-span-2 flex flex-col border-r-2 border-slate-700">
            <div class="flex border-b-2 border-slate-700">
                <div class="mb-2 flex flex-auto">
                    <input
                        class="grow text-white p-2 m-2 rounded-md placeholder:text-slate-400 bg-dark-input-bg"
                        [(ngModel)]="battle.name"
                        i18n-title title="Battle Title"
                        i18n-placeholder placeholder="Battle Title">
                </div>
            </div>
        </div>
    </div>
</div>
  `,
  styles: []
})
export class BattleComponent implements OnInit {
  battle$!: Observable<Battle>;

  constructor (private store: StoreService, private route: ActivatedRoute) {}

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
}
