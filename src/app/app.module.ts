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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-r3w1d3v5.us.auth0.com',
      clientId: '4L4WEhn4Z4zd1jGyggajRJwGxQaygzHi'
    }),
         NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
