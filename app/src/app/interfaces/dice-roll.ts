import { Dice } from "../enums/dice";

export interface DiceRoll {
    text: string;
    num: number;
    dice: Dice;
    modifier?: number;
    total?: number;
    rolls: Roll[];
}

export interface Roll {
    outcome?: number;
    advantage?: number;
    disadvantage?: number;
    critical?: boolean;
    failure?: boolean;
}
