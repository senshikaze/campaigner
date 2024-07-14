import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Campaign } from '../interfaces/campaign';
import { CampaignSection } from '../interfaces/campaign-section';
import { CampaignEntry } from '../interfaces/campaign-entry';
import { AlmanacEntry } from '../interfaces/almanac-entry';

@Injectable({
  providedIn: 'root'
})
export class DBService extends Dexie {
  // Almanac
  almanacEntryTable!: Table<AlmanacEntry, number>;
  // Battle
  // Campaign
  campaignTable!: Table<Campaign, number>;
  campaignSectionTable!: Table<CampaignSection, number>;
  campaignEntryTable!: Table<CampaignEntry, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      almanacEntryTable: "++id, campaign_id",
      campaignTable: "++id",
      campaignSectionTable: "++id, campaign_id",
      campaignEntryTable: "++id, section_id"
    });
  }
}
