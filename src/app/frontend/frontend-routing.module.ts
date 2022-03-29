import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionComponent } from './auction/auction.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

//components
import { FrontendLayoutComponent } from './frontend-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: FrontendLayoutComponent,
    children: [
        {
          path: '',
          pathMatch: 'full',
          component: HomeComponent,
        },
        {
          path: 'Home/:id',
          pathMatch: 'full',
          component: HomeComponent,
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'signup',
          component: SignupComponent
        },
        {
          path: 'collection',
          component: UserCollectionComponent
        },
        {
          path: 'auction',
          component: AuctionComponent
        },
        {
          path: 'shop',
          component: ShopComponent
        },
        {
          path: 'thank-you',
          component: ThankYouComponent
        },
        {
          path: 'privacy',
          component: PrivacyComponent
        },
        {
          path: 'disclaimer',
          component: DisclaimerComponent
        },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
