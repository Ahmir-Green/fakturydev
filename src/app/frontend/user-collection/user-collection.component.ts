import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

import { Utils } from 'src/utils';
import { OrderService } from '../shop/order.service';
import { UserService } from '../shop/user.service';
//import * as $ from 'jquery';
declare var $ : any;

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.css']
})
export class UserCollectionComponent implements OnInit {

  baseUrl = 'https://www.faktury.dev/api';
  imageBaseUrl = 'https://www.faktury.dev/images/'
  profileJson!: string;
  userForm: FormGroup;
  userEmail: string;
  user: any;
  xrplAddress: any;
  orders: any;

  constructor(public auth: AuthService, private userService: UserService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        if (profile) {
          this.userEmail = profile.email;
          this.getUserData(profile.email)
          this.getUserOrder(profile.email);
        }
        (this.profileJson = JSON.stringify(profile, null, 2))
      }
    );
    //Add Stripe form validations
    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      xrplAddress: new FormControl(''),
      });
  }
  getUserData(email: string) {
      this.userService.getUser(email).subscribe((res: any) => {
        this.xrplAddress = res.User.xrplAddress;
        this.userForm.patchValue({
          firstName: res.User.firstName,
          lastName: res.User.lastName,
          xrplAddress: res.User.xrplAddress
        });
      });
  }

  getUserOrder(email: string) {
    Utils.showSwalLoader();
    this.orderService.getOrder(email).subscribe((res: any) => {
      this.orders = res.Order
      Utils.closeSwalLoader();
    })
  }

    //Add stripe form actions
    get g() { return this.userForm.controls; }

    //update user
    updateUserProfile(user) {
      Utils.showSwalLoader();
      this.userService.updateUser(this.userEmail, user)
        // Close the userForm modal dialog window
        $('#stripeModal').modal('hide');

        setTimeout(()=>{                
          this.resetForm();
        });
        Utils.closeSwalLoader();
      }
    

    //reset form
    resetForm() {
      this.userForm.reset();
      this.ngOnInit()
    }

}
