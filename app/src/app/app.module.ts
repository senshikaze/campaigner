import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound.component';
import { SharedModule } from './shared.module';
import { ModalComponent } from './misc/modal/modal.component';
import { MARKED_OPTIONS, MarkdownModule } from 'ngx-markdown';
import { CloseButtonComponent } from './misc/close-button/close-button.component';
import { DiceRollerComponent } from './misc/dice-roller/dice-roller.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NotfoundComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    CloseButtonComponent,
    DiceRollerComponent,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true,
          sanitize: false,
        }
      }
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
