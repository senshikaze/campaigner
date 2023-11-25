import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { v4 as uuid} from 'uuid';

import { Campaign } from '../interfaces/campaign';
import { AlmanacEntry } from '../interfaces/almanac-entry';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  /**
   * Almanac methods
   */
  /**
   * Get the specific Almanac Entry by id
   * @param id Almanac Entry id
   * @returns Observable of AlamancEntry
   */
  getAlamanacEntry(id: string): Observable<AlmanacEntry> {
    let entry = JSON.parse(this.getFromStore(`almanac-${id}`)) as AlmanacEntry;
    return of(entry);
  }

  /**
   * Campaign methods
   */
  /**
   * Delete campaign from 
   * @param id 
   * @returns 
   */
  deleteCampaign(id: string): Observable<Campaign[]> {
    this.deleteFromStore(`campaigns-${id}`);
    return this.getCampaigns();
  }

  /**
   * Get Campaing from local storage
   * @param id Campaign Id
   * @returns Observalbe of Campaign
   */
  getCampaign(id: string): Observable<Campaign> {
    let campaign = JSON.parse(this.getFromStore(`campaigns-${id}`)) as Campaign;
    return of(campaign);
  }

  /**
   * Get All Campaigns from local storage
   * @returns Observable of an array of Campaigns 
   */
  getCampaigns(): Observable<Campaign[]> {
    let campaigns: string[] = this.getAllFromStoreByFilter('campaigns');
    return of(campaigns).pipe(
      map(camps => camps.map(c => JSON.parse(c) as Campaign))
    );
  }

  /**
   *  Save the campaign to localstorage
   * @returns Observable of the campaign saved
   */
  saveCampaign(campaign: Campaign): Observable<Campaign> {
    if (!campaign.id || campaign.id == "new") {
      // Generate campaign id
      campaign.id = uuid();
    }

    this.setToStore(`campaigns-${campaign.id}`, JSON.stringify(campaign));

    return of(campaign);
  }

  /**
   * Local Store operations
   */
  /**
   * delete from local store by key
   * @param key 
   */
  deleteFromStore(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Get from local store by key
   * @param key 
   */
  getFromStore(key: string): string {
    return localStorage.getItem(key) ?? "";
  }

  /**
   * Get all from local store where filter
   * @param filter 
   */
  getAllFromStoreByFilter(filter: string): string[] {
    return Object.keys(localStorage).filter(k => k.includes(filter)).map(k => localStorage.getItem(k)!);
  }

  /**
   * set value to local store by key
   * @param key 
   * @param value 
   */
  setToStore(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
