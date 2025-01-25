import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

import { Campaign } from '../interfaces/campaign';
import { StoreService } from '../services/store.service';
import { CampaignSection } from '../interfaces/campaign-section';

@Component({
  selector: 'campaign',
  template: `
  <div class="flex flex-col grow h-screen max-h-screen">
    <campaign-sections class="grow flex" *ngIf="campaign$ | async as campaign" [campaign]="campaign"></campaign-sections>
  </div>
  `,
  styles: []
})
export class CampaignComponent implements OnInit, OnDestroy {
  campaign$!: Observable<Campaign | undefined>;

  selectedSection!: CampaignSection;

  destroy$ = new Subject<boolean>();

  constructor(
    private store: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      if (p.has("id") && p.get("id") != "new") {
        this.campaign$ = this.store.getCampaign(Number.parseInt(p.get("id") ?? "-1"));
      } else if (p.get("id") == "new") {
        this.campaign$ = of({
          name: '',
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
