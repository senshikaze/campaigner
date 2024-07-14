import { AlmanacType } from "../enums/almanac-type";
import { AlmanacStats } from "./almanac-stats";

export interface AlmanacEntry {
    id?: number;
    campaign_id?: number;
    name: string;
    description: string;
    type: AlmanacType;
    stats?: AlmanacStats;
    attacks?: string;
    spells?: string;
}
