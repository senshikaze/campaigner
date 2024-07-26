import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextboxComponent } from './textbox.component';
import { MarkdownModule } from 'ngx-markdown';

describe('TextboxComponent', () => {
  let component: TextboxComponent;
  let fixture: ComponentFixture<TextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TextboxComponent,
        MarkdownModule.forRoot()
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
