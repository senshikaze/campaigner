import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound.component';
import { TextBoxModule } from './textbox/textbox.module';
import { SharedModule } from './shared.module';
import { ModalComponent } from './misc/modal/modal.component';
import { provideHttpCache, withHttpCacheInterceptor } from '@ngneat/cashew';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './misc/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NotfoundComponent,
    ModalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextBoxModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: environment.auth_domain,
      clientId: environment.auth_clientId,
      authorizationParams: {
        audience: environment.auth_audience,
        redirect_uri: window.location.origin,
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.data_store_url}*`
          }
        ]
      },
      useRefreshTokens: true,
      cacheLocation: "localstorage",
    })
  ],
  providers: [
    provideHttpClient(withInterceptors(
      [withHttpCacheInterceptor()]
    )),
    provideHttpCache(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
