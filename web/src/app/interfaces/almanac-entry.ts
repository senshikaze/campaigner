import { AlmanacType } from "../enums/almanac-type";
import { AlmanacStats } from "./almanac-stats";

export interface AlmanacEntry {
    id?: string;
    campaign?: number;
    name: string;
    description: string;
    type: AlmanacType;
    stats?: AlmanacStats;
    attacks?: string;
    spells?: string;
}
