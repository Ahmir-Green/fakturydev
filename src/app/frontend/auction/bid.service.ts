import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }

  // Define API
  apiURL = environment.apiUrl;


  // save bids to db
  addBid(data: any)
    {
      // console.log(data)
      return this.http.post(`${this.apiURL}/bids/`, data).pipe(
        catchError(this.handleError)
        );
    }
    handleError(err){
      if (err instanceof HttpErrorResponse) {

      } else {

      }
      return throwError(err);
      }
    // HttpClient API get() method => Fetch All Bids
    getBids() {
    return this.http.get(`${this.apiURL}/bids/`)
    }
    // get bid by id
    getOneBid(auctionId: string) {
      return this.http.get(`${this.apiURL}/bids/` + auctionId)
    }
}
