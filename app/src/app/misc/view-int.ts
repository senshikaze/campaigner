import { AfterViewChecked, AfterViewInit, Component } from "@angular/core";
import { DiceRollerService } from "../services/dice-roller.service"

@Component({
    template:''
})
export abstract class ViewInt implements AfterViewChecked{
    constructor(
        protected diceRoller: DiceRollerService,
    ) {}

    ngAfterViewChecked(): void {
        document.querySelectorAll("a.dice").forEach((el: Element) => {
            if (el.getAttribute('click') !== "true") {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let dice: string | null;
                    if (dice = (e.target as Element).getAttribute("dice")) {
                        this.diceRoller.addDice(dice);
                    }
                    return false;
                });
                el.setAttribute("click", "true");
            }
        });
    }
}
