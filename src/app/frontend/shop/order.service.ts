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
  apiURL = 'https://www.faktury.dev/api';


  // save order to db
  saveOrder(data: any)
    {
      return this.http.post(`${this.apiURL}/orders/`, data)
        .subscribe((res: any) => {
          if (res.message) {
            this.toastr.success(res.message);
            this.router.navigate(['thank-you'])
          }
        })
    }

    getOrder(id:string) {
      return this.http.get(`${this.apiURL}/orders/${id}`)
    }
}
