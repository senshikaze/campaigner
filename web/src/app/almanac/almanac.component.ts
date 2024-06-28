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
        <input 
          class="grow m-2 p-2 text-white rounded-md placeholder:text-slate-400 bg-dark-input-bg"
          placeholder="Search..."
          [(ngModel)]="search">
        <add-button (click)="onCreateClicked()" title="Add Entry"></add-button>
      </div>
      <div class="flex flex-row">
        <ul class="grow">
          <li class="p-2 odd:bg-dark-zebra-odd even:bg-dark-zebra-even" *ngFor="let entry of almanacEntries$ | async">
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
    this.almanacEntries$ = this.store.getAlmanacEntries();
  }

  onCreateClicked(): void {
    this.router.navigate(["new"], {relativeTo: this.route});
  }

  onDeleteClicked(entry: AlmanacEntry): void {
    if (entry.id !== undefined) {
      this.almanacEntries$ = this.store.deleteAlmanacEntry(entry.id);
    }
  }
}
