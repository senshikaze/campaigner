import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignListComponent } from './campaign-list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StoreService } from '../services/store.service';

describe('CampaignListComponent', () => {
  let component: CampaignListComponent;
  let fixture: ComponentFixture<CampaignListComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getCampaigns']);
    storeSpy.getCampaigns.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [ CampaignListComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: of([{id: 1}])},
        { provide: StoreService, useValue: storeSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
