import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, mergeMap, of, take, takeUntil } from 'rxjs';
import { EntryComponent } from 'src/app/campaign/entry/entry.component';
import { AlmanacType } from 'src/app/enums/almanac-type';
import { AlmanacEntry } from 'src/app/interfaces/almanac-entry';
import { Campaign } from 'src/app/interfaces/campaign';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-almanac-entry',
  template: `
    <app-almanac-form *ngIf="entry$ | async as entry" [entry]="entry" (saveEvent)="onSave(entry)"></app-almanac-form>
  `,
  styles: []
})
export class AlmanacEntryComponent implements OnInit {
  entry$!: Observable<AlmanacEntry>;
  campaigns$!: Observable<Campaign[]>;

  almanacTypes = Object.values(AlmanacType);

  constructor(
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.entry$ = this.route.paramMap.pipe(
      mergeMap(p => 
        (p.get('id') === 'new') 
          ? of({id:"new", name: "", description:"", type: AlmanacType.LOCATION} as AlmanacEntry)
          : this.store.getAlmanacEntry(p.get('id')!)
      )
    )
  }

  onSave(entry: AlmanacEntry): void {
    this.entry$ = this.store.saveAlmanacEntry(entry).pipe(
      map(e => {if (entry.id != e.id) this.router.navigate(['/almanac', e.id]); return e})
    )
  }
}
