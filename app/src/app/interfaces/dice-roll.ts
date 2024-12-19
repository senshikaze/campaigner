import { Dice } from "../enums/dice";

export interface DiceRoll {
    text: string;
    num: number;
    dice: Dice;
    modifier?: number;
    total?: number;
    advantage?: boolean;
    disavantage?: boolean;
    rolls: Roll[];
}

export interface Roll {
    outcome?: number;
    critical?: boolean;
    failure?: boolean;
}
