import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', [], {isAuthenticated$: of(false)});
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
