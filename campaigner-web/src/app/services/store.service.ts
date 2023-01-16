import { Injectable, isDevMode } from '@angular/core';
import { filter, from, map, Observable, of, reduce } from 'rxjs';
import { v4 as uuid} from 'uuid';

import { Campaign } from '../interfaces/campaign';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  getCampaign(id: string) {
    let campaigns = JSON.parse(localStorage.getItem('campaigns') ?? "[]") as Campaign[];
    return of(campaigns).pipe(
      map(campaign => {return campaign.filter(campaign => campaign.id == id)[0]})
    );
  }

  getCampaigns(): Observable<Campaign[]> {
    let campaigns = localStorage.getItem('campaigns') ?? "[]";
    return from(of(campaigns)).pipe(
      map(camps => JSON.parse(camps) as Campaign[])
    );
  }

  saveCampaign(campaign: Campaign): Observable<Campaign> {
    let campaigns = JSON.parse(localStorage.getItem('campaigns') ?? "[]") as Campaign[];
    if (!campaign.id || campaign.id == "new") {
      // Generate campaign id
      campaign.id = uuid();
    } else {
      campaigns = campaigns.filter(c => c.id != campaign.id);
    }

    campaigns.push(campaign)

    localStorage.setItem("campaigns", JSON.stringify(campaigns));

    return from(of(campaign)).pipe(
      map(campaign => campaign)
    )
  }
}
