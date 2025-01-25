import { Component, OnInit } from '@angular/core';
import { Battle } from '../interfaces/battle';
import { Observable, share, take } from 'rxjs';
import { StoreService } from '../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '../misc/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'battle-list',
  template: `
  <div class="flex flex-col p-2">
    <div class="flex mb-4 grow">
      <span class="grow"></span>
      <add-button (click)="onCreateClicked()" title="Add Battle"></add-button>
    </div>
    <div class="flex grow">
      <table class="grow border-collapse table-auto">
        <tr class="bg-light-zebra-odd dark:bg-dark-zebra-odd">
          <th class="p-2 text-xl text-left w-2/3">Name</th>
          <th class="p-2 text-xl text-left">In Combat</th>
          <th class="p-2 text-xl text-left"></th>
        </tr>
        @for (battle of battles$ | async; track battle) {
          <tr class="odd:bg-light-zebra-odd dark:odd:bg-dark-zebra-odd even:bg-light-zebra-even dark:even:bg-dark-zebra-even">
            <td class="text-lg">
              <a
                class="p-2 block"
                [routerLink]="['/battles', battle.id]"
                [state]="battle"
                [title]="battle.name">
                {{battle.name}}
              </a>
            </td>
            <td class="p-2 text-lg">
              {{battle.current_entity_id ? "Yes" : "No"}}
            </td>
            <td class="p-2">
              <delete-button
                [value]="battle"
                (clicked)="onDeleteClicked($event)"
                title="Delete Battle">
              </delete-button>
            </td>
          </tr>
        }
      </table>
    </div>
  </div>
  `,
  styles: []
})
export class BattleListComponent implements OnInit {
  battles$!: Observable<Battle[]>;

  constructor(
    private store: StoreService,
    private modal: ModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.battles$ = this.store.getBattles().pipe(share());
  }

  onCreateClicked(): void {
    this.router.navigate(["new"], {relativeTo: this.route})
  }

  onDeleteClicked(battle: Battle): void {
    if (battle.id) {
      let data: ConfirmDialogInterface = {
        message: "Are you sure you want to delete this battle?",
        confirm: true,
        yes: () => this.store.deleteBattle(battle).pipe(
          take(1)
        ).subscribe(s => {
          this.modal.close();
          this.battles$ = this.store.getBattles();
        }),
        no: () => this.modal.close(),
        ok: () => this.modal.close(),
        cancel: () => this.modal.close(),
      };
      this.modal.open({
        header: "Are you sure?",
        closable: true,
        component: ConfirmDialogComponent,
        data: data
      });
    }
  }
}
