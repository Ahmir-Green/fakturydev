import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FrontendRoutingModule } from './frontend-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FrontendLayoutComponent } from './frontend-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AuctionComponent } from './auction/auction.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { ShopComponent } from './shop/shop.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThankYouComponent } from './thank-you/thank-you.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FrontendLayoutComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UserCollectionComponent,
    PrivacyComponent,
    AuctionComponent,
    DisclaimerComponent,
    ShopComponent,
    ThankYouComponent
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    NgbModule
  ]
})
export class FrontendModule { }
