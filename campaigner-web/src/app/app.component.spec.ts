import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreService } from './services/store.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let apiSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('StoreService', ['getFromStore']);
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SidebarComponent
      ],
      providers: [
        {provide: StoreService, useValue: apiSpy}
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
