import { AlmanacType } from "../enums/almanac-type";
import { AlmanacStats } from "./almanac-stats";

export interface AlmanacEntry {
    _id?: string;
    campaign?: string;
    name: string;
    description: string;
    type: AlmanacType;
    stats?: AlmanacStats;
    attacks?: string;
    spells?: string;
}
