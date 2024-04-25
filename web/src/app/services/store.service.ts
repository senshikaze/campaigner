import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { v4 as uuid} from 'uuid';

import { Campaign } from '../interfaces/campaign';
import { AlmanacEntry } from '../interfaces/almanac-entry';
import { CampaignSection } from '../interfaces/campaign-section';
import { CampaignEntry } from '../interfaces/campaign-entry';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor(private http: HttpClient) { }

  /** 
   * HTTP Methods
   */
  delete<T>(url: string): Observable<T> {
    // TODO error handling, login for auth0
    let options = {
      headers: {
        "Content-Type": "application/json",
      }
    };
    return this.http.delete<T>(`${environment.data_store_url}/${url}`, options);
  }

  get<T>(url: string): Observable<T> {
    // TODO error handling, login for auth0
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.get<T>(`${environment.data_store_url}/${url}`, options);
  }

  post<T>(url: string, data: any): Observable<T> {
    let options = {
      headers: {
        "Content-Type": "application/json",
      }
    };
    return this.http.post<T>(`${environment.data_store_url}/${url}`, data, options);
  }

  patch<T>(url: string, data: any): Observable<T> {
    let options = {
      headers: {
        "Content-Type": "application/json",
      }
    };
    return this.http.patch<T>(`${environment.data_store_url}/${url}`, data, options);
  }

  /**
   * Almanac methods
   */
  deleteAlmanacEntry(id: string): Observable<AlmanacEntry[]> {
    HttpClient
    this.deleteFromStore(`almanac-${id}`);
    return this.getAlmanacEntries();
  }

  /**
   * Get the specific Almanac Entry by id
   * @param id Almanac Entry id
   * @returns Observable of AlamancEntry
   */
  getAlmanacEntry(id: string): Observable<AlmanacEntry> {
    return of(JSON.parse(this.getFromStore(`almanac-${id}`) ?? "null") as AlmanacEntry);
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
  getAlmanacEntriesByCampaign(campaign: number, filter: string | null = null): Observable<AlmanacEntry[]> {
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
  deleteCampaign(campaign: Campaign): void {
    if (campaign.id) {
      this.http.delete<Campaign[]>(`campaigns/${campaign.id}`)
    }

  }

  /**
   * Get Campaing from store
   * @param id Campaign Id
   * @returns Observalbe of Campaign
   */
  getCampaign(id: string): Observable<Campaign> {
    return this.get<Campaign>(`campaigns/${id}`);
  }

  /**
   * Get All Campaigns from store
   * @returns Observable of an array of Campaigns 
   */
  getCampaigns(): Observable<Campaign[]> {
    return this.get<Campaign[]>('campaigns/');
  }

  /**
   *  Save the campaign to localstorage
   * @returns Observable of the campaign saved
   */
  saveCampaign(campaign: Campaign): Observable<Campaign> {
    if (campaign.id) {
      return this.patch<Campaign>(`campaigns/${campaign.id}`, campaign);
    }
    return this.post<Campaign>(`campaigns/`, campaign);
  }

  /**
   * Campaign Entry endpoints
   */
  deleteCampaignEntry(entry: CampaignEntry): Observable<never> {
    if (!entry.id) {
      return of(); 
    }
    return this.delete<never>(`entries/${entry.id}`);
  }

  getCampaignEntry(id: string): Observable<CampaignEntry> {
    return this.get<CampaignEntry>(`entries/${id}`);
  }

  saveCampaignEntry(entry: CampaignEntry): Observable<CampaignEntry> {
    if (entry.id) {
      return this.patch<CampaignEntry>(`entries/${entry.id}`, entry);
    }
    return this.post<CampaignEntry>(`entries`, entry);
  }

  /**
   * Section endpoints
   */
  /**
   * Delete Section and associated entries
   * @param section 
   */
  deleteSection(section: CampaignSection): Observable<never> {
    if (!section.id) {
      return of();
    }
    return forkJoin([
      this.delete<never>(`sections/${section.id}`),
      this.delete<never>(`sections/${section.id}/entries`)
    ]).pipe(
      switchMap(n => n)
    );
  }

  /**
   * Get all entries for a section
   */
  getSectionEntries(section: CampaignSection): Observable<CampaignEntry[]> {
    if (!section.id) {
      return of([]);
    }

    return this.get<CampaignEntry[]>(`sections/${section.id}/entries`);
  }

  /**
   * Get all sections for campaign
   * @param campaign 
   * @returns 
   */
  getSections(campaign: Campaign): Observable<CampaignSection[]> {
    if (!campaign.id) {
      return of([]);
    }

    return this.get<CampaignSection[]>(`campaigns/${campaign.id}/sections`);
  }

  /**
   * Save section to store
   * @param section 
   */
  saveSection(section: CampaignSection): Observable<CampaignSection> {
    if (!section.campaign_id) {
      return of(section);
    }
  
    return this.post<CampaignSection>(`sections`, section);
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
  getFromStore(key: string): string | null {
    return localStorage.getItem(key);
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
