import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntityDescriptionComponent } from './battle-entity-description.component';
import { StoreService } from 'src/app/services/store.service';

describe('BattleEntityDescriptionComponent', () => {
  let component: BattleEntityDescriptionComponent;
  let fixture: ComponentFixture<BattleEntityDescriptionComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj("StoreService", ["saveBattleEntity"]);
    await TestBed.configureTestingModule({
      declarations: [BattleEntityDescriptionComponent],
      providers: [
        {provide: StoreService, useValue: storeSpy}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleEntityDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
