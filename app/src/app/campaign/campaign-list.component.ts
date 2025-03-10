import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, share, Observable, take, from } from 'rxjs';
import { Campaign } from '../interfaces/campaign';
import { StoreService } from '../services/store.service';
import { ModalService } from '../services/modal.service';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '../misc/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'campaign-list',
  template:`
<div class="flex flex-col p-2">
  <div class="flex mb-4 grow">
    <span class="grow"></span>
    <add-button (click)="onCreateClicked()" title="Add Campaign"></add-button>
  </div>
  <div class="flex grow">
    <table class="grow border-collapse table-auto">
      <tr class="bg-light-zebra-odd dark:bg-dark-zebra-odd">
        <th class="p-2 text-left text-xl">Name</th>
        <th class="p-2 text-left text-xl">Sections</th>
        <th class="p-2 text-left"></th>
      </tr>
      @for (campaign of campaigns$ | async; track campaign.id) {
      <tr class="odd:bg-light-zebra-odd dark:odd:bg-dark-zebra-odd even:bg-light-zebra-even dark:even:bg-dark-zebra-even">
        <td class="w-2/3">
          <a
            class="p-2 block text-lg hover:font-bold"
            [routerLink]="['/campaign/', campaign.id]"
            [state]="campaign"
            [title]="campaign.name"
          >{{campaign.name}}</a>
        </td>
        <td class="p-2"></td>
        <td class="p-2">
          <delete-button (click)="onDeleteClicked(campaign)" title="Delete Campaign"></delete-button>
        </td>
      </tr>
      }
    </table>
  </div>
</div>
  `
})
export class CampaignListComponent implements OnInit {
  campaigns$: Observable<Campaign[]> = of([]);

  constructor(
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService) {}

  ngOnInit(): void {
    this.campaigns$ = this.store.getCampaigns().pipe(share());
  }

  onCreateClicked() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onDeleteClicked(campaign: Campaign) {
    if (campaign.id !== undefined) {
      let data: ConfirmDialogInterface = {
        message: "Are you sure you want to delete this campaign?\nThis will delete everything associated with it.",
        confirm: true,
        yes: () => this.store.deleteCampaign(campaign).pipe(
          take(1)
        ).subscribe(s => {
          this.modal.close();
          this.campaigns$ = this.store.getCampaigns();
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

  getCampaignSections(campaign: Campaign): Observable<number> {
    return from(this.store.getCampaignSectionsCollection(campaign).count());
  }
}
