import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreService } from './services/store.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';
import { ModalComponent } from './misc/modal/modal.component';
import { AuthService } from '@auth0/auth0-angular';
import { DiceRollerComponent } from './misc/dice-roller/dice-roller.component';

describe('AppComponent', () => {
  let apiSpy: jasmine.SpyObj<StoreService>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('StoreService', ['getFromStore']);
    authSpy = jasmine.createSpyObj('AuthService', [], ['isAuthenticated$']);
    
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SidebarComponent,
        ModalComponent,
        MockComponents(DiceRollerComponent)
      ],
      providers: [
        {provide: StoreService, useValue: apiSpy },
        {provide: AuthService, useValue: authSpy }
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
