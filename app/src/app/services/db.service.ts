import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Campaign } from '../interfaces/campaign';
import { CampaignSection } from '../interfaces/campaign-section';
import { CampaignEntry } from '../interfaces/campaign-entry';
import { AlmanacEntry } from '../interfaces/almanac-entry';
import { Battle } from '../interfaces/battle';
import { Entity } from '../interfaces/entity';
import { State } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class DBService extends Dexie {
  // Almanac
  almanacEntryTable!: Table<AlmanacEntry, number>;
  // Battle
  battleTable!: Table<Battle, number>;
  // Campaign
  campaignTable!: Table<Campaign, number>;
  campaignSectionTable!: Table<CampaignSection, number>;
  campaignEntryTable!: Table<CampaignEntry, number>;
  // Entities
  entitiesTable!: Table<Entity, number>;
  // State
  stateTable!: Table<State>

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      almanacEntryTable: "++id, campaign_id",
      battleTable: "++id",
      campaignTable: "++id",
      campaignSectionTable: "++id, campaign_id",
      campaignEntryTable: "++id, section_id",
      entitiesTable: "++id, campaign_id, battle_id",
      stateTable: "++id, variable",
    });
  }
}
