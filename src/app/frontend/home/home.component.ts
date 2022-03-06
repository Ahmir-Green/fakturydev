import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    var namePattern = '^(?! )[A-Za-z ]*(?<! )$';
    var messagePattern = "^[a-zA-Z].*[\s\.]*$";
    var emailPattern = "^[a-zA-Z]{1}[a-zA-Z0-9.\-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{2,}$";

    this.form = new FormGroup({
      name : new FormControl('', [Validators.required,
                                  Validators.pattern(namePattern),
                                  Validators.minLength(3)]),
      email: new FormControl('',    [Validators.required,
                                      Validators.email,
                                      Validators.pattern(emailPattern)]),
      message: new FormControl('', [Validators.required,
                                    Validators.pattern(messagePattern),
                                    Validators.minLength(3)])
    })
  }

  // convenience getter for easy access to contactUs fields
  get f() { return this.form.controls; }

  contactUs() {
    console.log(this.form.value)
  }

  show: boolean = false;
  clickEvent(){
    this.show = !this.show;       
  }

}
