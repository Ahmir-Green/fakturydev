import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,ReactiveFormsModule, Validators, FormControl, AbstractControl } from "@angular/forms";
import Validation from '../utils/validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    phone: new FormControl(null),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        lastName: [
            '',
            [
              Validators.required,
              Validators.minLength(3)
            ]
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(4)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],
        confirmPassword: ['', Validators.required],
        phone: [null, [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11)]]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}

