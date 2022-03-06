import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  form!: FormGroup;
  showProductDes: any = {};
  
  constructor() { }

  ngOnInit(): void {
      var emailPattern = "^[a-zA-Z]{1}[a-zA-Z0-9.\-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{2,}$";

      this.form = new FormGroup({
        address : new FormControl('', [Validators.required]),
        email: new FormControl('',    [Validators.required,
                                        Validators.email,
                                        Validators.pattern(emailPattern)]),
        xrpBid: new FormControl('', [Validators.required]),
        fakBid: new FormControl('', [Validators.required])
      })
  }
  // convenience getter for easy access to Registration fields
  get f() { return this.form.controls; }
  
  auctionForm() {

  }


  show: boolean = false;
  clickEvent(){
    this.show = true;       
  }
}
