import { Component, OnInit } from '@angular/core';
import { PlayerAvatarComponent } from "../player-avatar/player-avatar.component";
import { Player } from 'src/app/interfaces/player';
import { StoreService } from 'src/app/services/store.service';
import { InputComponent } from "../../../../misc/input/input.component";

@Component({
  selector: 'add-player',
  standalone: true,
  imports: [
    PlayerAvatarComponent,
    InputComponent
  ],
  template: `
  <div class="mt-4 ml-4">
    <player-avatar [player]="player" (avatarChanged)="player = $event"></player-avatar>
    <cInput [(value)]="player.name" placeholder="Player Name"></cInput>
  </div>
  `,
  styles: ``
})
export class AddPlayerComponent implements OnInit {
  player = {} as Player;


  constructor (
    private store: StoreService,
  ) {}

  ngOnInit(): void {
    
  }

  save(): void {

  }
}
