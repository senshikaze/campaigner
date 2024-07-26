import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntitiesComponent } from './battle-entities.component';
import { MockComponents } from 'ng-mocks';
import { BattleEntityDescriptionComponent } from './battle-entity-description/battle-entity-description.component';
import { StoreService } from 'src/app/services/store.service';
import { Battle } from 'src/app/interfaces/battle';
import { AddButtonComponent } from 'src/app/misc/add-button/add-button.component';
import { InputComponent } from 'src/app/misc/input/input.component';
import { of } from 'rxjs';

describe('BattleEntitiesComponent', () => {
  let component: BattleEntitiesComponent;
  let fixture: ComponentFixture<BattleEntitiesComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;
  let battle: Battle;

  beforeEach(async () => {
    battle = {
      id: 1,
      name: "TestBattle"
    };
    storeSpy = jasmine.createSpyObj('StoreService', ['getBattleEntities']);
    storeSpy.getBattleEntities.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [
        BattleEntitiesComponent,
        MockComponents(
          BattleEntityDescriptionComponent,
          AddButtonComponent,
          InputComponent
        )
      ],
      providers: [
        {provide: StoreService, useValue: storeSpy}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleEntitiesComponent);
    component = fixture.componentInstance;
    component.battle = battle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
