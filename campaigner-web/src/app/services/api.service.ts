import { Injectable, isDevMode } from '@angular/core';
import { from, map, Observable, of, reduce } from 'rxjs';
import { Campaign } from '../interfaces/campaign';
import { Entry } from '../interfaces/entry';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getCampaigns(): Observable<Campaign[]> {
    let campaigns = localStorage.getItem('campaigns') ?? "[]";
    return from(of(campaigns)).pipe(
      map(camps => JSON.parse(camps) as Campaign[])
    );
  }

  saveCampaign(campaign: Campaign): Observable<Campaign> {
    let campaigns = JSON.parse(localStorage.getItem('campaigns') ?? "[]") as Campaign[];
    if (!campaign.id) {
      // Generate campaign id
    } else {
      campaigns = campaigns.filter(c => c.id != campaign.id);
      campaigns.push(campaign)
    }

    localStorage.setItem("campaigns", JSON.stringify(campaigns));

    return from(of(campaign)).pipe(
      map(campaign => campaign)
    )
  }
}
