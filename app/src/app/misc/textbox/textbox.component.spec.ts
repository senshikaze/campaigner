import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextboxComponent } from './textbox.component';
import { MarkdownModule } from 'ngx-markdown';
import { DiceRollerService } from 'src/app/services/dice-roller.service';

describe('TextboxComponent', () => {
  let component: TextboxComponent;
  let fixture: ComponentFixture<TextboxComponent>;
  let diceRollerSpy: jasmine.SpyObj<DiceRollerService>;

  beforeEach(async () => {
    let diceRollerSpy = jasmine.createSpyObj("DiceRollerService", ["roll"]);
    await TestBed.configureTestingModule({
      imports: [
        TextboxComponent,
        MarkdownModule.forRoot()
      ],
      providers: [
        {provide: DiceRollerService, useValue: diceRollerSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
