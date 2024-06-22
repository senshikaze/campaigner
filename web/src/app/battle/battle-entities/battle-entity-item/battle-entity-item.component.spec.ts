import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntityItemComponent } from './battle-entity-item.component';
import { StoreService } from 'src/app/services/store.service';
import { MockComponents } from 'ng-mocks';
import { HealthPickerComponent } from 'src/app/misc/health-picker/health-picker.component';
import { BattleEntity } from 'src/app/interfaces/battle-entity';
import { FormsModule } from '@angular/forms';

describe('BattleEntityItemComponent', () => {
  let component: BattleEntityItemComponent;
  let fixture: ComponentFixture<BattleEntityItemComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;
  let entity: BattleEntity;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ["get", "post"]);
    entity = {
      id: 1,
      battle_id: 1,
      total_health: 100,
      current_health: 50,
      initiative: 3,
      description: "string",
    };
    await TestBed.configureTestingModule({
      declarations: [
        BattleEntityItemComponent,
        MockComponents(HealthPickerComponent)
      ],
      providers: [
        {provide: StoreService, useValue: storeSpy}
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleEntityItemComponent);
    component = fixture.componentInstance;

    component.entity = entity;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
