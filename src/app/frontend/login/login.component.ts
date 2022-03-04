import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
     })
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  }
