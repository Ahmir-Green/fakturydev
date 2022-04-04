import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
declare var $ : any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document, private router:Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  status: boolean = false;
  hideElement(){
    this.status = !this.status;       
  }

  addNavigationClass() {
    $('.toggle-menu').toggleClass('open');
    $('.navigation').toggleClass('active');
  }

  removeNavigationClass() {
    $('.navigation').removeClass('active');
    $('.toggle-menu').removeClass('open');
  }

  navigate(name){
    this.removeNavigationClass()
    this.router.navigate(['/home',name]);
  }

}
