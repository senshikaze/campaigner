import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { Party } from 'src/app/interfaces/party';
import { AddButtonComponent } from 'src/app/misc/add-button/add-button.component';
import { DeleteButtonComponent } from 'src/app/misc/delete-button/delete-button.component';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'parties',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AddButtonComponent,
    DeleteButtonComponent,
  ],
  template: `
    <div class="flex mb-4 grow">
      <span class="grow"></span>
      <add-button (click)="onPartyCreateClicked()" title="Add Party"></add-button>
    </div>
    <div class="flex grow">
      <table class="grow border-collapse table-auto">
        <tr class="bg-light-zebra-odd dark:bg-dark-zebra-odd">
          <th class="p-2 text-left text-xl">Name</th>
          <th class="p-2 text-left text-xl">Sections</th>
          <th class="p-2 text-left"></th>
        </tr>
        @for (party of parties$ | async; track party.id) {
        <tr class="odd:bg-light-zebra-odd dark:odd:bg-dark-zebra-odd even:bg-light-zebra-even dark:even:bg-dark-zebra-even">
          <td class="w-2/3">
            <a
              class="p-2 block text-lg hover:font-bold"
              [routerLink]="['/players/parties/', party.id]"
              [state]="party"
              title="Party {{party.id}}"
            >Party {{party.id}}</a>
          </td>
          <td class="p-2"></td>
          <td class="p-2">
            <delete-button (click)="onPartyDeleteClicked(party)" title="Delete Party"></delete-button>
          </td>
        </tr>
        }
      </table>
    </div>
  `,
  styles: ``
})
export class PartiesComponent implements OnInit {
  parties$ = new Subject<Party[]>();
  
  constructor(
      private store: StoreService
    ) {}
  
  ngOnInit(): void {

  }

  onPartyCreateClicked(): void {

  }

  onPartyDeleteClicked(party: Party): void {

  }
}
