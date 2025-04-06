import { Dice } from "../enums/dice";
import { ItemType } from "../enums/item-type";

export interface ItemInfo {
    id?: number;
    campaign_id?: number;
    name: string;
    description: string;
    type: ItemType;
    price?: string;
    weight?: number;
    attack_modifider?: number;
    damage_dice?: Dice;
    damage_type?: string;
    properties?: string;
    magical?: boolean;
    ac_modifier?: number;
}
