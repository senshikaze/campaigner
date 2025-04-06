import { Race } from "../enums/race";

export interface RaceInfo {
    id?: number;
    campaign_id?: number;
    name: string;
    race: Race;
    description: string;
}
