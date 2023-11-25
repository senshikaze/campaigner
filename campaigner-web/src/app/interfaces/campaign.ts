import { CampaignEntry } from "./campaign-entry";

export interface Campaign {
    id: string;
    name: string;
    entries: CampaignEntry[];
}
