import { Injectable, isDevMode } from '@angular/core';
import { filter, flatMap, from, map, mergeMap, Observable, of, reduce } from 'rxjs';
import { v4 as uuid} from 'uuid';

import { Campaign } from '../interfaces/campaign';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  deleteCampaign(id: string): Observable<Campaign[]> {
    localStorage.removeItem(`campaigns-${id}`)
    return this.getCampaigns();
  }

  getCampaign(id: string): Observable<Campaign> {
    let campaign = JSON.parse(localStorage.getItem(`campaigns-${id}`) ?? "") as Campaign;
    return of(campaign).pipe(
      map(campaign => {return campaign})
    );
  }

  /**
   * Get All Campaigns from local storage
   * @returns Observable of an array of Campaigns 
   */
  getCampaigns(): Observable<Campaign[]> {
    let campaigns: string[] = [];
    Object.keys(localStorage).map(k => (k.includes('campaigns') ? campaigns.push(localStorage.getItem(k)!) : null));
    return of(campaigns).pipe(
      map(camps => camps.map(c => JSON.parse(c) as Campaign))
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
