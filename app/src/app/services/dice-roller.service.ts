import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiceRoll, Roll } from '../interfaces/dice-roll';
import { inDice } from '../enums/dice';
import { BehaviorSubject, catchError, map, Observable, of, reduce, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {
  dice = new BehaviorSubject<DiceRoll[]>([]);

  dice$ = this.dice.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  addDice(dice: string | DiceRoll): Observable<DiceRoll[]> {
    let dr: DiceRoll | undefined;
    if (typeof dice === "string") {
      dr = this.parseDice(dice);
    } else {
      dr = dice;
    }
    if (dr) {
      this.roll(dr).pipe(
        take(1),
        map(dr => this.dice.next([...this.dice.value, ...[dr]]))
      ).subscribe();
    }
    return this.dice$; 
  }

  getDice(): Observable<DiceRoll[]> {
    return this.dice$;
  }

  removeDice(dice: DiceRoll): Observable<DiceRoll[]> {
    let dr = this.dice.value;
    this.dice.next(dr.filter(d => d != dice));
    return this.dice$;
  }

  rollFromString(dice: string): Observable<DiceRoll | undefined> {
    let diceRoll: DiceRoll | undefined;
    if (diceRoll = this.parseDice(dice)) {
      return this.roll(diceRoll);
    }
    return of();
  }

  /**
   * Parse the dice entered in the format of:
   * 1d6+4
   * (Roll 1 d6 with a +4 modifier after the roll(s))
   * Supported dice: d2, d4, d6, d8, d10, d12, d20, d100
   * @param value inputted dice value
   * @returns DiceRoll or undefined if not valid
   */
  parseDice(value: string): DiceRoll | undefined {
    // 0: 1d6+4
    // (1)d(2)(3)(4)
    let regDice = value.match(/(\d+)d(\d*)([+-]*)(\d*)/i);
    if (!regDice) {
      return undefined;
    }

    if (!regDice[1] || !regDice[2]) {
      return undefined;
    }

    if (!inDice(Number.parseInt(regDice[2]))) {
      return undefined;
    }

    // we have a valid dice roll
    let diceRoll: DiceRoll = {
      text: regDice[0],
      num: Number.parseInt(regDice[1]),
      dice: Number.parseInt(regDice[2]),
      rolls: []
    };

    let modifier = Number.parseInt(regDice[4]);
    if (modifier) {
      diceRoll.modifier = (regDice[3] == '-') ? modifier * -1 : modifier;
    }
    return diceRoll;
  }

  roll(diceRoll: DiceRoll): Observable<DiceRoll> {
    Math.random();
    return this.getRandomNumber(1, 1, diceRoll.dice).pipe(
      take(diceRoll.num),
      reduce((acc, val) => [...acc, ...val]),
      map(nums => {
        let rolls: Roll[] = [];
        for (let num of nums) {
          rolls.push({
            outcome: num,
            critical: num == diceRoll.dice,
            failure: num == 1
          });
        }
        diceRoll.rolls = rolls;
        diceRoll.total = diceRoll.rolls.reduce((sum, roll) => sum + (roll.outcome ?? 0), 0) + (diceRoll.modifier ?? 0);
        return diceRoll
      })
    );
      //error: e => {diceRoll.total = [Math.floor(Math.random() * diceRoll.dice) + 1].reduce((roll, sum) => sum + roll, 0); return diceRoll;}
  }

  getRandomNumber(count: number, min: number, max: number): Observable<number[]> {
    return this.http.get(
      `https://www.random.org/integers/?num=${count}&min=${min}&max=${max}&col=1&format=plain&base=10&rnd=new`,
      {responseType: 'text'}
    ).pipe(
      catchError(err => {
        console.error(err.error);
        Math.random();
        return of((Math.floor(Math.random() * max) + 1).toString());
      }),
      map(r => {
        let rolls : number [] = []
        for (let line of r.trim().split("\n")) {
          rolls.push(Number.parseInt(line));
        }
        return rolls;
      }),
      take(1)
    );
  }

  isFailure(diceRoll: DiceRoll): boolean {
    return diceRoll.rolls.filter(r => r.failure).length > 0;
  }

  isCritical(diceRoll: DiceRoll): boolean {
    return diceRoll.rolls.filter(r => r.critical).length > 0;
  }
}
