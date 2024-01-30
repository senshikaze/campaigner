import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, map, of, takeUntil, timer } from 'rxjs';
import { Location } from '@angular/common';

import { Campaign } from '../interfaces/campaign';
import { CampaignEntry } from '../interfaces/campaign-entry';
import { StoreService } from '../services/store.service';
import { CampaignSection } from '../interfaces/campaign-section';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styles: []
})
export class CampaignComponent implements OnInit, OnDestroy {
  campaign$!: Observable<Campaign>;

  sections$: Observable<CampaignSection[]> = of([]);
  selectedSection!: CampaignSection;

  entries$: Observable<CampaignEntry[]> = of([]);


  destroy$ = new Subject<boolean>();

  constructor(
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      if (p.has("id") && p.get("id") != "new") {
        this.campaign$ = this.store.getCampaign(p.get("id") as string);
      } else if (p.get("id") == "new") {
        this.campaign$ = of({
          name: '',
        });
      }
    });

    this.campaign$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(camp => this.sections$ = this.store.getSections(camp));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSaveClicked(campaign: Campaign): void {
    this.store.saveCampaign(campaign).subscribe(
      c => this.router.navigate(['/campaign', c._id])
    );
  }
}
