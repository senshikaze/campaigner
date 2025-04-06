import { Component } from '@angular/core';
import { PlayerAvatarComponent } from "./player-avatar/player-avatar.component";
import { InputComponent } from "../../../misc/input/input.component";
import { PlayerLevelInfoComponent } from "./player-level-info/player-level-info.component";
import { BehaviorSubject } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { StoreService } from 'src/app/services/store.service';
import { PlayerHealthInfoComponent } from "./player-health-info/player-health-info.component";
import { HamburgerMenuComponent } from "../../../misc/hamburger-menu/hamburger-menu.component";
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Rest } from 'src/app/enums/rest';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    PlayerAvatarComponent,
    InputComponent,
    PlayerLevelInfoComponent,
    PlayerHealthInfoComponent,
    HamburgerMenuComponent
],
  template: `
  <div class="mx-2">
    <hamburger-menu></hamburger-menu>
    <div class="flex">
      <div class="flex">
        <div class="flex flex-grow-1 p-2" title="Character Info">
          <player-avatar class="flex-grow-0"></player-avatar>
          <div class="flex flex-col">
            <cInput class="flex-grow" ></cInput>
            <player-level-info></player-level-info>
          </div>
        </div>
        <player-health-info></player-health-info>
      </div>

      <div class="flex flex-col">
      </div>
    </div>
  </div>
  `,
  styles: ``
})
export class PlayerComponent {
  player$ = new BehaviorSubject<Player>({} as Player);

  editing = false;

  menuItems: MenuItem[] = [
    {
      text: "Edit",
      title: "Edit character",
      action: () => this.editing = !this.editing
    },
    {
      text: "Take Short Rest",
      title: "Perform Short Rest action",
      action: () => this.takeRest(Rest.SHORT)
    },
    {
      text: "Take Short Rest",
      title: "Perform Short Rest action",
      action: () => this.takeRest(Rest.SHORT)
    }
  ];

  constructor(
    private store: StoreService
  ) {}


  takeRest(type: Rest): void {

  }
}
