import { EntityType } from "../enums/entity-type";
import { Race } from "../enums/race";
import { Experience } from "./experience";
import { SkillInfo } from "./skill-info";
import { Stats } from "./stats";

export interface Player {
    id?: number;
    type: EntityType;
    battle_id?: number;
    party_id?: number;
    campaign_id?: number;
    name?: string;
    avatar?: string;
    gender?: string;
    height?: string;
    race?: Race;
    description?: string;
    notes?: string;
    initiative?: number;
    total_health?: number;
    current_health?: number;
    allows_negative?: boolean;
    stats?: Stats;
    proficient_skills?: SkillInfo[];
    experience?: Experience;
}