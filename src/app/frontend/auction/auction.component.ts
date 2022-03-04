import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  show: boolean = false;
  clickEvent(){
    this.show = true;       
  }
}
