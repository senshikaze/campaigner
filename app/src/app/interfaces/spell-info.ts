import { SpellLevel } from "../enums/spell-level";

export interface SpellInfo {
    id?: number;
    campaign_id?: number;
    name: string;
    slot: SpellLevel;
    range: string;
    casting_time: string;
    duration: string;
    action: boolean;
    reaction: boolean;
    upcast: boolean;

    components: string;
    description: string;
}
