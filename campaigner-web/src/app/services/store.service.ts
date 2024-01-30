import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { v4 as uuid} from 'uuid';

import { Campaign } from '../interfaces/campaign';
import { AlmanacEntry } from '../interfaces/almanac-entry';
import { CampaignSection } from '../interfaces/campaign-section';
import { CampaignEntry } from '../interfaces/campaign-entry';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
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
        "x-apikey": environment.api_token,
        "Content-Type": "application/json",
      }
    };
    return this.http.delete<T>(`${environment.data_store_url}/${url}`, options);
  }

  get<T>(url: string): Observable<T> {
    // TODO error handling, login for auth0
    let options = {
      headers: {
        "x-apikey": environment.api_token,
        "Content-Type": "application/json",
      }
    };
    return this.http.get<T>(`${environment.data_store_url}/${url}`, options);
  }

  post<T>(url: string, data: any): Observable<T> {
    let options = {
      headers: {
        "x-apikey": environment.api_token,
        "Content-Type": "application/json",
      }
    };
    return this.http.post<T>(`${environment.data_store_url}/${url}`, data, options);
  }

  patch<T>(url: string, data: any): Observable<T> {
    let options = {
      headers: {
        "x-apikey": environment.api_token,
        "Content-Type": "application/json",
      }
    };
    return this.http.patch<T>(url, data, options);
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
    if (entry._id === "new") {
      entry._id = uuid();
    }
    this.setToStore(`almanac-${entry._id}`, JSON.stringify(entry));
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
  deleteCampaign(campaign: Campaign): void {
    if (campaign._id) {
      this.http.delete<Campaign[]>(`campaigns/${campaign._id}`)
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
    if (campaign._id) {
      return this.patch<Campaign>(`campaigns/${campaign._id}`, campaign);
    }
    return this.post<Campaign>(`campaigns/`, campaign);
  }

  /**
   * Section endpoints
   */
  /**
   * Delete Section and associated entries
   * @param section 
   */
  deleteSection(section: CampaignSection): void {
    if (section._id == "") {
      return;
    }
    // delete all entries in this section
    Object.keys(localStorage)
      .filter(k => k.includes(`entries-${section._id}-`))
      .forEach(e => this.deleteFromStore(`entries-${section._id}-${e}`));
    this.deleteFromStore(`sections-${section._id}`);
  }

  /**
   * Get all entries for a section
   */
  getSectionEntries(section: CampaignSection): Observable<CampaignEntry[]> {
    if (section._id == null || section._id == "new") {
      return of([]);
    }

    return of(this.getAllFromStoreByFilter(`entries-${section._id}-`).map(
      e => JSON.parse(e) as CampaignEntry
    ));
  }

  /**
   * Get all sections for campaign
   * @param campaign 
   * @returns 
   */
  getSections(campaign: Campaign): Observable<CampaignSection[]> {
    if (!campaign._id || campaign._id == "new") {
      return of([]);
    }
    let sections = this.getAllFromStoreByFilter(`sections-${campaign._id}-`).map(
      s => JSON.parse(s) as CampaignSection
    );
    return of(sections);
  }

  /**
   * Save section to store
   * @param section 
   */
  saveSection(section: CampaignSection): Observable<CampaignSection> {
    if (section._id == "" || section._id == "new") {
      section._id = uuid();
    }

    this.setToStore(`sections-${section.campaign}-${section._id}`, JSON.stringify(section));

    return of(section);
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
