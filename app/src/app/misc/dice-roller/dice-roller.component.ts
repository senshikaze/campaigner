import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiceRoll } from 'src/app/interfaces/dice-roll';
import { InputComponent } from '../input/input.component';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, map, reduce, take, takeUntil } from 'rxjs';
import { inDice } from 'src/app/enums/dice';
import { HttpClient } from '@angular/common/http';
import { CloseButtonComponent } from '../close-button/close-button.component';

@Component({
  selector: 'dice-roller',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    CloseButtonComponent,
  ],
  template: `
  <div class="flex flex-col m-2">
    <div [class]="{'hidden': !show}" class="transition ease-in-out duration-700 shadow-md bg-light-bg dark:bg-dark-bg min-w-32 min-h-96 max-h-svh rounded-md flex flex-col">
      <div class="grow flex flex-col min-w-full min-h-96 overflow-scroll">
        <div class="border-b-2 last:border-b-0 border-slate-400 dark:border-slate-700 grow flex justify-start" *ngFor="let roll of (rolls$ | async); index as i">
          <div class="p-2 grow">  
            <span class="text-sm block">{{roll.text}}</span>
            <span class="text-5xl font-bold">{{roll.outcome ?? "None"}}</span>
          </div>
          <div>
            <button
              class="m-2 p-2 bg-light-action dark:bg-dark-action hover:bg-light-action-hover dark:hover:bg-dark-action-hover rounded-md"
              (click)="replay(i, roll)"
              title="Re-Roll">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="border-t-2 border-slate-400 dark:border-slate-700 flex">
        <cInput class="grow mr-2" styleClass="w-full" (valueChange)="this.valueSubject.next($event)"></cInput>
        <button
          class="justify-end m-2 p-2 bg-light-action dark:bg-dark-action hover:bg-light-action-hover dark:hover:bg-dark-action-hover rounded-md disabled:bg-dark-bg-alt disabled:hover:bg-dark-bg-alt"
          (click)="roll(valueSubject.value)"
          title="Re-Roll"
          [disabled]="!valid">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
        <close-button *ngIf="valueSubject.value.length > 0" (clicked)="rollsSubject.next([]); valueSubject.next('')" title="Clear Rolls"></close-button>
      </div>
    </div>
    <div class="flex justify-end">
      <button 
        class="p-2 m-1 size-14 rounded-full justify-end text-right text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover" 
        (click)="show = !show"
        [title]="(show) ? 'Hide Dice Roller': 'Show Dice Roller'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" class="size-10">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M 16 3.71875 L 15.375 4.21875 L 7.125 10.625 L 6.875 10.84375 L 6.78125 11.15625 L 4.03125 21.25 L 3.8125 22.03125 L 16 28.125 L 28.1875 22.03125 L 27.96875 21.25 L 25.21875 11.15625 L 25.125 10.84375 L 24.875 10.625 L 16.625 4.21875 Z M 15 7.0625 L 15 10 L 11.21875 10 Z M 17 7.0625 L 20.78125 10 L 17 10 Z M 9.0625 12 L 14 12 L 10.40625 16.78125 Z M 18 12 L 22.9375 12 L 21.59375 16.78125 Z M 16 12.6875 L 20 18 L 12 18 Z M 7.8125 15 L 8.8125 18.5 L 6.5625 19.625 Z M 24.1875 15 L 25.4375 19.625 L 23.1875 18.5 Z M 12 20 L 20 20 L 16 25.3125 Z M 9.6875 20.28125 L 12.625 24.1875 L 7.25 21.5 Z M 22.3125 20.28125 L 24.75 21.5 L 19.375 24.1875 Z"/>
        </svg>
      </button>
    </div>
  </div>
  `,
  styles: []
})
export class DiceRollerComponent implements OnInit, OnDestroy {
  show = false;
  valid = false;

  valueSubject = new BehaviorSubject<string>("");
  value$ = this.valueSubject.asObservable();

  rollsSubject = new BehaviorSubject<DiceRoll[]>([]);
  rolls$ = this.rollsSubject.asObservable();

  destroy$ = new Subject<boolean>();
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.value$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map(v => this.roll(v)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
    };

    let modifier = Number.parseInt(regDice[4]);
    if (modifier) {
      diceRoll.modifier = (regDice[3] == '-') ? modifier * -1 : modifier;
    }
    return diceRoll;
  }

  roll(dice: string): void {
    let diceRoll = this.parseDice(dice);
    if (!diceRoll) {
      this.valid = false;
      return;
    }
    this.rollDemBones(diceRoll).subscribe(dr => this.addToRolls(dr));
  }

  rollDemBones(diceRoll: DiceRoll): Observable<DiceRoll> {
    Math.random();
    return this.getRandomNumber(1, 1, diceRoll.dice).pipe(
      take(diceRoll.num),
      reduce((acc, val) => [...acc, ...val]),
      map(nums => {diceRoll.outcome = nums.reduce((roll, sum) => sum + roll, 0); return diceRoll})
    );
      //error: e => {diceRoll.outcome = [Math.floor(Math.random() * diceRoll.dice) + 1].reduce((roll, sum) => sum + roll, 0); return diceRoll;}
  }

  getRandomNumber(count: number, min: number, max: number): Observable<number[]> {
    return this.http.get(
      `https://www.random.org/integers/?num=${count}&min=${min}&max=${max}&col=1&format=plain&base=10&rnd=new`,
      {responseType: 'text'}
    ).pipe(
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

  addToRolls(diceRoll: DiceRoll): void {
    let current = this.rollsSubject.value;
    current = [...current, ...[diceRoll]];
    this.rollsSubject.next(current);
  }

  updateRoll(index: number, diceRoll: DiceRoll): void {
    let current = this.rollsSubject.value;
    current[index] = diceRoll;
    this.rollsSubject.next(current);
  }

  replay(index: number, diceRoll: DiceRoll): void {
    this.rollDemBones(diceRoll).subscribe(dr => this.updateRoll(index, dr));
  }
}
