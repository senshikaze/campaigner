import { EntityType } from "../enums/entity-type";
import { Stats } from "./stats";

export interface Entity {
    id?: number;
    type: EntityType;
    battle_id?: number;
    campaign_id?: number;
    name: string;
    description: string;
    notes: string;
    initiative?: number;
    total_health?: number;
    current_health?: number;
    allows_negative?: boolean;
    stats?: Stats;
}