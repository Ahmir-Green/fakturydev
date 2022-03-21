import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }

  // Define API
  apiURL = 'https://www.faktury.dev/api';


  // save bids to db
  addBid(data: any)
    {
      // console.log(data)
      return this.http.post(`${this.apiURL}/bids/`, data)
        .subscribe((res: any) => {
          this.toastr.success(res.message);
        })
    }
}
