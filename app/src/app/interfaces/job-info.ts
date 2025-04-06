import { ArmorType } from "../enums/armor-type";
import { Dice } from "../enums/dice";
import { Job } from "../enums/job";
import { StatType } from "../enums/stats";
import { WeaponType } from "../enums/weapon-type";
import { SkillInfo } from "./skill-info";

export interface JobInfo {
    id?: number;
    campaign_id?: number;
    name: string;
    job: Job;
    subClass: boolean;
    hit_dice: Dice;
    starting_hit_points: number;
    hit_points_level: Dice;

    armor_proficiencies: ArmorType[];
    weapon_proficiencies: WeaponType[];
    tool_proficiencies: string[];
    
    saving_throws: StatType[];
    skills: SkillInfo[];
}
