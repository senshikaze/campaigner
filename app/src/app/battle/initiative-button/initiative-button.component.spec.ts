import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeButtonComponent } from './initiative-button.component';
import { InitiativeService } from '../services/initiative.service';

describe('InitiativeButtonComponent', () => {
  let component: InitiativeButtonComponent;
  let fixture: ComponentFixture<InitiativeButtonComponent>;
  let initiativeSpy: jasmine.SpyObj<InitiativeService>;

  beforeEach(async () => {
    initiativeSpy = jasmine.createSpyObj("InitiativeService", ["isStarted"]);
    await TestBed.configureTestingModule({
      declarations: [InitiativeButtonComponent],
      providers: [
        {provide: InitiativeService, useValue: initiativeSpy}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiativeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
