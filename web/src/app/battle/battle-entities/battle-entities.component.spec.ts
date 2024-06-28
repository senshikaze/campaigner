import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntitiesComponent } from './battle-entities.component';
import { MockComponents } from 'ng-mocks';
import { BattleEntityDescriptionComponent } from './battle-entity-description/battle-entity-description.component';

describe('BattleEntitiesComponent', () => {
  let component: BattleEntitiesComponent;
  let fixture: ComponentFixture<BattleEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BattleEntitiesComponent,
        MockComponents(BattleEntityDescriptionComponent)
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
