import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListRowComponent } from './player-list-row.component';
import { Player } from 'src/app/interfaces/player';
import { StoreService } from 'src/app/services/store.service';
import { RouterModule } from '@angular/router';

describe('PlayerListRowComponent', () => {
  let component: PlayerListRowComponent;
  let fixture: ComponentFixture<PlayerListRowComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  let player: Player;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getCampaign']);
    player = {} as Player;
    await TestBed.configureTestingModule({
      imports: [
        PlayerListRowComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerListRowComponent);
    component = fixture.componentInstance;
    component.player = player;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
