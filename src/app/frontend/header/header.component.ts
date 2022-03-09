import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  status: boolean = false;
  hideElement(){
    this.status = !this.status;       
  }

}
