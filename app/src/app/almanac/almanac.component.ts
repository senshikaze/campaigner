import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlmanacEntry } from '../interfaces/almanac-entry';
import { StoreService } from '../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'almanac',
  template: `
    <div class="flex flex-col">
      <div class="flex flex-row">
        <cInput
        class="grow"
        [(value)]="search"
        placeholder="Search..."></cInput>
        <add-button (click)="onCreateClicked()" title="Add Entry"></add-button>
      </div>
      <div class="flex flex-row">
        <ul class="grow">
          <li class="p-2 odd:bg-light-zebra-odd even:bg-light-zebra-even dark:odd:bg-dark-zebra-odd dark:even:bg-dark-zebra-even" *ngFor="let entry of almanacEntries$ | async">
            <div class="flex flex-row">
              <p class="px-4 block align-middle text-lg">{{entry.name}}</p>
              <p class="px-4 block align-middle grow">{{entry.description | ellipsis:50}}</p>
              <p class="px-4 block align-middle">{{entry.type}}</p>
              <view-button [routerLink]="['/almanac/', entry.id]" title="View Entry"></view-button>
              <delete-button (click)="onDeleteClicked(entry)" title="Delete Entry"></delete-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: []
})
export class AlmanacComponent implements OnInit {
  search: string = '';

  almanacEntries$!: Observable<AlmanacEntry[]>;

  constructor(
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  onCreateClicked(): void {
    this.router.navigate(["new"], {relativeTo: this.route});
  }

  onSearch(query: string): void {
    this.almanacEntries$ = this.store.getAlmanacEntries(query);
  }

  onDeleteClicked(entry: AlmanacEntry): void {
    if (entry.id !== undefined) {
      this.store.deleteAlmanacEntry(entry);
    }
  }
}
