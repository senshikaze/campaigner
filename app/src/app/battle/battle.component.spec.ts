import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';
import { StoreService } from '../services/store.service';
import { MockComponents } from 'ng-mocks';
import { SaveButtonComponent } from '../misc/save-button/save-button.component';
import { AddButtonComponent } from '../misc/add-button/add-button.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { InputComponent } from '../misc/input/input.component';
import { InitiativeButtonComponent } from './initiative-button/initiative-button.component';
import { BattleEntitiesComponent } from './battle-entities/battle-entities.component';
import { BattleEntityDescriptionComponent } from './battle-entities/battle-entity-description/battle-entity-description.component';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getBattle']);
    await TestBed.configureTestingModule({
      declarations: [
        BattleComponent,
        MockComponents(
          SaveButtonComponent, AddButtonComponent, InputComponent,
          InitiativeButtonComponent, BattleEntitiesComponent,
          BattleEntityDescriptionComponent
        )
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({id: 1})) } },
        { provide: StoreService, useValue: storeSpy }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
