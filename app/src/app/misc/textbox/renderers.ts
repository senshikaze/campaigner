import { scoreToModifier, statToString, StatType } from "src/app/enums/stats";
import { Entity } from "src/app/interfaces/entity";

export function renderDiceRoll(dice: string): string {
    return `<a class="dice cursor-pointer bg-slate-400 hover:bg-slate-500 p-1 px-2 rounded-lg no-underline" dice="${dice}">${dice}</a>`
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

export function renderRollStatModifier(entity: Entity, dice: string, modifier: number, action: string): string {
    return `<a class="dice cursor-pointer bg-slate-400 hover:bg-slate-500 p-1 px-2 rounded-lg no-underline" dice="${dice}+${modifier.toString()}">${action} (${dice}${modifier > 0? '+'+modifier:'-'+modifier })</a>`;
}

export function renderStat(entity: Entity, stat: string): string {
    return `<span class="text-xl">${stat.toUpperCase()} - ${entity.stats?.[(stat as keyof typeof entity.stats)]}</span>`;
}

