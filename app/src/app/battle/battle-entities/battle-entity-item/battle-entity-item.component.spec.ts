import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntityItemComponent } from './battle-entity-item.component';
import { StoreService } from 'src/app/services/store.service';
import { MockComponents } from 'ng-mocks';
import { HealthPickerComponent } from 'src/app/misc/health-picker/health-picker.component';
import { BattleEntity } from 'src/app/interfaces/battle-entity';
import { FormsModule } from '@angular/forms';
import { CloseButtonComponent } from 'src/app/misc/close-button/close-button.component';
import { DragItemComponent } from 'src/app/misc/drag-item/drag-item.component';
import { InputComponent } from 'src/app/misc/input/input.component';

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
        MockComponents(HealthPickerComponent, CloseButtonComponent, DragItemComponent, InputComponent)
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
