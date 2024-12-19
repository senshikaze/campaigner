import { AfterViewChecked, AfterViewInit, Component } from "@angular/core";
import { DiceRollerService } from "../services/dice-roller.service"
import { renderDiceRoll } from "./textbox/renderers";
import { Dice } from "../enums/dice";

@Component({
    template:''
})
export abstract class ViewInt implements AfterViewChecked{
    constructor(
        protected diceRoller: DiceRollerService,
    ) {}

    ngAfterViewChecked(): void {
        // Set up hooks for clicking on textbox elements

        // dice element
        document.querySelectorAll("a.dice").forEach((el: Element) => {
            if (el.getAttribute('click') !== "true") {
                el.addEventListener('click', (e) => {
                    let ev = e as MouseEvent;
                    ev.stopPropagation();
                    let dice = (ev.target as Element).getAttribute("dice");
                    if (!dice) {
                        return false;
                    }
                    let dr = this.diceRoller.parseDice(dice);
                    if (!dr) {
                        return false;
                    }
                    if (ev.button == 2) {
                        // show the context menu for this dice
                        // NOTE: only d20 can roll dis/advantage
                        let context = new HTMLDivElement();
                        context.classList.add(`absolute top-${ev.y} left-${ev.x}`);
                        let optionList = new HTMLUListElement();
                        let advantage = new HTMLLIElement();
                        if (dr.dice == Dice.D20) {
                            advantage.innerText = `Advantage: ${dice}`;
                            advantage.addEventListener('click', e => {
                                e.stopPropagation();
                                // dr! because the builder cannot see that it can't
                                // be undefined here
                                this.diceRoller.addDice(dr!, {advantage: true});
                                document.removeChild(context);
                            });
                            optionList.appendChild(advantage);
                            
                            let disadvantage = new HTMLLIElement()
                            disadvantage.innerText = `Disadvantage: ${dice}`;
                            disadvantage.addEventListener('click', e => {
                                e.stopPropagation();
                                // dr! because the builder cannot see that it can't
                                // be undefined here
                                this.diceRoller.addDice(dr!, {disadvantage: true});
                                document.removeChild(context);
                            });
                            optionList.appendChild(disadvantage);
                        }
                        context.appendChild(optionList);
                        document.append(context);

                        document.addEventListener("keydown", e => {
                            e.preventDefault();
                            document.removeChild(context);
                            document.removeEventListener("keydown", e => null);
                        })
                        return false;
                    }
                        
                    this.diceRoller.addDice(dr);
                    return false;
                });
                el.setAttribute("click", "true");
                el.addEventListener("contextmenu", e => e.preventDefault());
            }
        });
    }
}
