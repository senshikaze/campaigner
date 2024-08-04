import { Entity } from "src/app/interfaces/entity";

function scoreToModifier(score: number): number {
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
            return 5;
    }
}

function statToString(stat: string): string {
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
    if (stat == "defence") {
        return "AC";
    }
    if (stat == "speed") {
        return "Speed";
    }
    return "";
}

export function renderStatsBlock(entity: Entity): string {
    let block = `
    <table class="w-96 border-collapse border border-slate-700 dark:border-slate-500">
    `;
    for (let stat of Object.keys(entity?.stats ?? {}) as Array<keyof typeof entity.stats>) {
        if (stat != "defense" && stat != "speed") {
            block = block + `
            <tr class="border border-slate-700 dark:border-slate-500">
                <th class="p-2 text-bold text-justify text-white bg-slate-800 dark:bg-slate-600 border border-slate-700 dark:border-slate-500">${statToString(stat)}</th>
                <td class="p-2 text-xl border border-slate-700 dark:border-slate-500">${scoreToModifier(entity.stats?.[stat] ?? 10)} <span class="text-sm">(${entity.stats?.[stat]})</span></td>
                <td class="p-2 border border-slate-700 dark:border-slate-500">
                    <a 
                    class="dice cursor-pointer bg-slate-400 hover:bg-slate-500 p-1 px-2 rounded-lg no-underline" 
                    dice="1d20+${scoreToModifier(entity.stats?.strength ?? 10)}">
                        Roll
                    </a>
                </td>
            </tr>
            `;
        }
    }
    return block + `</table>`;
}

