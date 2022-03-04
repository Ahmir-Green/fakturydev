import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from "../environments/environment";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-fwbgmky5.us.auth0.com',
      clientId: 'bow1dX1H6ljxreG5U8FkIs9plUsQs6bd'
    }),
         NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
