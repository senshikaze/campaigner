import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntityComponent } from './battle-entity.component';
import { StoreService } from 'src/app/services/store.service';
import { MarkdownService } from 'ngx-markdown';

describe('BattleEntityComponent', () => {
  let component: BattleEntityComponent;
  let fixture: ComponentFixture<BattleEntityComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreSpy', ["saveEntity"]);
    await TestBed.configureTestingModule({
      imports: [BattleEntityComponent],
      providers: [
        {provide: StoreService, useValue: storeSpy},
        MarkdownService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
