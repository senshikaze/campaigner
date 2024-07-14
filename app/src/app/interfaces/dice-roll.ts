import { Dice } from "../enums/dice";

export interface DiceRoll {
    text: string;
    num: number;
    dice: Dice;
    modifier?: number;
    outcome?: number;
}
