import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';
import { Race } from 'src/app/enums/race';
import { Player } from 'src/app/interfaces/player';
import { RaceInfo } from 'src/app/interfaces/race-info';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'player-level-info',
  standalone: true,
  imports: [],
  template: `
    <span>{{player.gender ?? "Unknown"}} </span>
    <span>{{player.race ? getRaceName(player.race) : "Unknown"}} </span>
    <span>{{player.experience?.character_level}}</span>
    <span>{{player.experience?.primary_job ?? "None"}}: {{player.experience?.primary_job_level}} </span>
    @if (player.experience?.secondary_job) {
      <span>/ {{player.experience?.secondary_job ?? "None"}}: {{player.experience?.secondary_job}}</span>
    }
  `,
  styles: ``
})
export class PlayerLevelInfoComponent implements OnInit {
  @Input() player: Player = {} as Player;

  races$ = new BehaviorSubject<RaceInfo[]>([]);

  constructor(
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.store.getRaces().pipe(
      map(races => this.races$.next(races)),
      take(1)
    ).subscribe();
  }

  getRaceName(race: Race): string {
    let races = this.races$.getValue();
    return races.filter(r => r.race = race)[0]?.name ?? "Unknown";
  }
}
