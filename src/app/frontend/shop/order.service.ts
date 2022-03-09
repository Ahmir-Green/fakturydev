import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }

  // base url
  apiURL = 'https://abcportal.ml/api';


  // save order to db
  saveOrder(data: any)
    {
      return this.http.post(`${this.apiURL}/orders/`, data)
        .subscribe((res: any) => {
          this.toastr.success(res.message);
        })
    }
}
