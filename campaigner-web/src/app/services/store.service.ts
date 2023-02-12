import { Injectable, isDevMode } from '@angular/core';
import { filter, from, map, Observable, of, reduce } from 'rxjs';
import { v4 as uuid} from 'uuid';

import { Campaign } from '../interfaces/campaign';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  deleteCampaign(id: string): void {
    localStorage.removeItem(`campaigns-${id}`)
  }

  getCampaign(id: string): Observable<Campaign> {
    let campaign = JSON.parse(localStorage.getItem(`campaigns-${id}`) ?? "") as Campaign;
    return of(campaign).pipe(
      map(campaign => {return campaign})
    );
  }

  getCampaigns(): Observable<Campaign[]> {
    let campaigns = {...localStorage}
    campaigns
    return of(campaigns).pipe(
      map(camps => JSON.parse(camps) as Campaign[])
    );
  }

  saveCampaign(campaign: Campaign): Observable<Campaign> {
    if (!campaign.id || campaign.id == "new") {
      // Generate campaign id
      campaign.id = uuid();
    }

    localStorage.setItem(`campaigns-${campaign.id}`, JSON.stringify(campaign));

    return from(of(campaign)).pipe(
      map(campaign => campaign)
    )
  }
}
