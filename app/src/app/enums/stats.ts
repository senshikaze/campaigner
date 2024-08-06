
export enum StatType {
    STR="strength",
    CHA="charisma",
    DEX="dexterity",
    WIS="wisdom",
    INT="intelligence",
    CON="constitution",
    THP="totalHealth",
    CHP="currentHealth",
    DEF="defense",
    AC="defense",
    SPD="speed",
}

export function scoreToModifier(score: number): number {
    switch(score) {
        case 1:
            return -5;
        case 2:
        case 3:
            return -4;
        case 4:
        case 5:
            return -3;
        case 6:
        case 7:
            return -2;
        case 8:
        case 9:
            return -1
        case 10:
        case 11:
        default:
            return 0;
        case 12:
        case 13:
            return 1;
        case 14:
        case 15:
            return 2;
        case 16:
        case 17:
            return 3;
        case 18:
        case 19:
            return 4;
        case 20:
        case 21:
            return 5;
        case 22:
        case 23:
            return 6;
        case 24:
        case 25:
            return 7;
        case 26:
        case 27:
            return 8;
        case 28:
        case 29:
            return 9;
        case 30:
            return 10;
    }
}

export function statToString(stat: StatType): string {
    if (stat == "strength") {
        return "STR";
    }
    if (stat == "dexterity") {
        return "DEX";
    }
    if (stat == "constitution") {
        return "CON";
    }
    if (stat == "intelligence") {
        return "INT";
    }
    if (stat == "wisdom") {
        return "WIS";
    }
    if (stat == "charisma") {
        return "CHA";
    }
    if (stat == "defense") {
        return "AC";
    }
    if (stat == "speed") {
        return "Speed";
    }
    return "";
}

export function keyToStat(key: string): StatType | undefined {
    if (key.toUpperCase() == "STR") {
        return StatType.STR;
    }
    if (key.toUpperCase() == "DEX") {
        return StatType.DEX;
    }
    if (key.toUpperCase() == "CON") {
        return StatType.CON;
    }
    if (key.toUpperCase() == "INT") {
        return StatType.INT;
    }
    if (key.toUpperCase() == "WIS") {
        return StatType.WIS;
    }
    if (key.toUpperCase() == "CHA") {
        return StatType.CHA;
    }
    if (key.toUpperCase() == "AC") {
        return StatType.AC;
    }
    if (key.toUpperCase() == "SPD") {
        return StatType.SPD;
    }
    return;
}