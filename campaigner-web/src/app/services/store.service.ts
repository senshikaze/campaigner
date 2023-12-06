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
  deleteAlmanacEntry(id: string): Observable<AlmanacEntry[]> {
    this.deleteFromStore(`almanac-${id}`);
    return this.getAlmanacEntries();
  }

  /**
   * Get the specific Almanac Entry by id
   * @param id Almanac Entry id
   * @returns Observable of AlamancEntry
   */
  getAlmanacEntry(id: string): Observable<AlmanacEntry> {
    let entry = JSON.parse(this.getFromStore(`almanac-${id}`)) as AlmanacEntry;
    return of(entry);
  }

  /**
   * Get all alamanc entries, optionally with string filter
   * @param filter (optional) find entries with string in name or description
   * @returns 
   */
  getAlmanacEntries(filter: string | null = null): Observable<AlmanacEntry[]> {
    let entries = this.getAllFromStoreByFilter('almanac-').map(e => JSON.parse(e) as AlmanacEntry);
    if (filter !== null) {
      entries = entries.filter(e => e.name.includes(filter) || e.description.includes(filter))
    }
    return of(entries);
  }

  saveAlmanacEntry(entry: AlmanacEntry): Observable<AlmanacEntry> {
    if (entry.id === "new") {
      entry.id = uuid();
    }
    this.setToStore(`almanac-${entry.id}`, JSON.stringify(entry));
    return of(entry);
  }

  /**
   * Get all alamanc entries from campaign, optionally with string filter
   * @param filter (optional) find entries with string in name or description
   */
  getAlmanacEntriesByCampaign(campaign: string, filter: string | null = null): Observable<AlmanacEntry[]> {
    let entries = this.getAllFromStoreByFilter('almanac-')
      .map(e => JSON.parse(e) as AlmanacEntry)
      .filter(e => e.campaign === campaign);
    if (filter !== null) {
      entries = entries.filter(e => e.name.includes(filter) || e.description.includes(filter));
    }
    return of(entries);
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
