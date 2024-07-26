import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, of } from 'rxjs';
import { liveQuery } from 'dexie';
import { DBService } from './db.service';

import { Campaign } from '../interfaces/campaign';
import { AlmanacEntry } from '../interfaces/almanac-entry';
import { CampaignSection } from '../interfaces/campaign-section';
import { CampaignEntry } from '../interfaces/campaign-entry';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Battle } from '../interfaces/battle';
import { BattleEntity } from '../interfaces/battle-entity';


@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor(
    private http: HttpClient,
    private db: DBService
  ) { }

  /** 
   * CRUD Methods
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
  deleteAlmanacEntry(entry: AlmanacEntry): Observable<void> {
    if (!entry.id) {
      return of();
    }
    return from(liveQuery(() => this.db.almanacEntryTable.delete(entry.id ?? -1)));
  }

  /**
   * Get the specific Almanac Entry by id
   * @param id Almanac Entry id
   * @returns Observable of AlamancEntry
   */
  getAlmanacEntry(id: number): Observable<AlmanacEntry | undefined> {
    return from(liveQuery(() => this.db.almanacEntryTable.where({id: id}).first()));
  }

  /**
   * Get all alamanc entries, optionally with string filter
   * @param filter (optional) find entries with string in name or description
   * @returns 
   */
  getAlmanacEntries(query: string): Observable<AlmanacEntry[]> {
    return from(liveQuery(() => this.db.almanacEntryTable
      .filter(a => a.name.includes(query) || a.description.includes(query))
      .toArray()
    ));
  }

  saveAlmanacEntry(entry: AlmanacEntry): Observable<AlmanacEntry> {
    return from(this.db.almanacEntryTable.put(entry, entry.id)).pipe(
      map(id => Object.assign(entry, {id: id}))
    );
  }

  /**
   * Get all alamanc entries from campaign, optionally with string filter
   * @param query (optional) find entries with string in name or description
   */
  getAlmanacEntriesByCampaign(campaign: Campaign, query?: string | undefined): Observable<AlmanacEntry[]> {
    return from(liveQuery(() => this.db.almanacEntryTable.where({campaign_id: campaign.id})
      .filter(a => (query) ? (a.name.includes(query) || a.description.includes(query)) : true)
      .toArray()
    ));
  }

  /**
   * Battle methods
   */
  deleteBattle(battle: Battle): Observable<void> {
    if (!battle.id) {
      return of(); 
    }
    return from(this.db.battleEntityTable.delete(battle.id));
  }

  getBattle(id: number): Observable<Battle | undefined> {
    return from(liveQuery(() => this.db.battleTable.where({id: id}).first()));
  }

  getBattles(): Observable<Battle[]> {
    return from(liveQuery(() => this.db.battleTable.toArray()));
  }

  saveBattle(battle: Battle): Observable<Battle> {
    return from(this.db.battleTable.put(battle, battle.id)).pipe(
      map(id => {battle.id = id; return battle;})
    );
  }

  deleteBattleEntity(battleEntity: BattleEntity): Observable<void> {
    if (!battleEntity.id) {
      return of();
    }
    return from(this.db.battleEntityTable.delete(battleEntity.id));
  }

  getBattleEntity(id: number): Observable<BattleEntity | undefined> {
    return from(liveQuery(() => this.db.battleEntityTable.where({id: id}).first()));
  }

  getBattleEntities(battle: Battle): Observable<BattleEntity[]> {
    return from(liveQuery(() => 
      this.db.battleEntityTable.where({battle_id: battle.id}).toArray()
    )).pipe(
      map(entities => entities.sort((a, b) => ((b.initiative ?? 0) > (a.initiative ?? 0)) ? 1:-1))
    );
  }

  saveBattleEntity(entity: BattleEntity): Observable<BattleEntity> {
    return from(this.db.battleEntityTable.put(entity, entity.id)).pipe(
      map(id => {entity.id = id; return entity})
    );
  }

  /**
   * Campaign methods
   */
  /**
   * Delete campaign from 
   * @param id 
   * @returns 
   */
  deleteCampaign(campaign: Campaign): Observable<void> {
    if (!campaign.id) {
      return of();
    }
    return from(this.db.campaignTable.delete(campaign.id ?? -1));
    //this.http.delete<Campaign[]>(`campaigns/${campaign.id}`)
  }

  /**
   * Get Campaing from store
   * @param id Campaign Id
   * @returns Observalbe of Campaign
   */
  getCampaign(id: number): Observable<Campaign | undefined> {
    //return this.get<Campaign>(`campaigns/${id}`);
    return from(liveQuery(() => this.db.campaignTable.where({id: id}).first()));
  }

  /**
   * Get All Campaigns from store
   * @returns Observable of an array of Campaigns 
   */
  getCampaigns(): Observable<Campaign[]> {
    //return this.get<Campaign[]>('campaigns/');
    return from(liveQuery(() => this.db.campaignTable.toArray()));
  }

  /**
   *  Save the campaign to localstorage
   * @returns Observable of the campaign saved
   */
  saveCampaign(campaign: Campaign): Observable<Campaign> {
    return from(this.db.campaignTable.put(campaign, campaign.id)).pipe(
      map(id => Object.assign(campaign, {id: id}))
    );
    //return this.post<Campaign>(`campaigns/`, campaign);
  }

  /**
   * Campaign Entry endpoints
   */
  deleteCampaignEntry(entry: CampaignEntry): Observable<void> {
    if (!entry.id) {
      return of(); 
    }
    return from(this.db.campaignEntryTable.delete(entry.id ?? -1));
    //return this.delete<never>(`entries/${entry.id}`);
  }

  getCampaignEntry(id: number): Observable<CampaignEntry | undefined> {
    //return this.get<CampaignEntry>(`entries/${id}`);
    return from(liveQuery(() => this.db.campaignEntryTable.where({id: id}).first()))
  }

  saveCampaignEntry(entry: CampaignEntry): Observable<CampaignEntry> {
    return from(this.db.campaignEntryTable.put(entry, entry.id)).pipe(
      map(id => Object.assign(entry, {id: id}))
    );
    //return this.post<CampaignEntry>(`entries`, entry);
  }

  /**
   * Section endpoints
   */
  /**
   * Delete Section and associated entries
   * @param section 
   */
  deleteSection(section: CampaignSection): Observable<void> {
    if (!section.id) {
      return of();
    }
    return forkJoin([
      from(this.db.campaignSectionTable.delete(section.id ?? -1)),
      from(this.db.campaignEntryTable.where({section_id: section.id}).delete())
    ]).pipe(map(r => {return;}));
    /*return forkJoin([
      this.delete<never>(`sections/${section.id}`),
      this.delete<never>(`sections/${section.id}/entries`)
    ]).pipe(
      switchMap(n => n)
    );*/
  }

  /**
   * Get all entries for a section
   */
  getSectionEntries(section: CampaignSection): Observable<CampaignEntry[]> {
    if (!section.id) {
      return of([]);
    }
    return from(liveQuery(() => this.db.campaignEntryTable.where({section_id: section.id}).toArray()));
    //return this.get<CampaignEntry[]>(`sections/${section.id}/entries`);
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
    return from(liveQuery(() => this.db.campaignSectionTable.toArray()));
    //return this.get<CampaignSection[]>(`campaigns/${campaign.id}/sections`);
  }

  /**
   * Save section to store
   * @param section 
   */
  saveSection(section: CampaignSection): Observable<CampaignSection> {
    return from(this.db.campaignSectionTable.put(section, section.id)).pipe(
      map(id => {section.id = id; return section})
    );
    //return this.post<CampaignSection>(`sections`, section);
  }
}
