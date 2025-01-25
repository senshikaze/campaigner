import { AlmanacType } from "../enums/almanac-type";

export interface AlmanacEntry {
    id?: number;
    campaign_id?: number;
    name: string;
    description: string;
    type: AlmanacType;
}
