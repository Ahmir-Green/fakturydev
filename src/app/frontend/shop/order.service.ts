import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }

  // base url
  apiURL = environment.apiUrl;


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

    getOrder(email:string) {
      return this.http.get(`${this.apiURL}/orders/${email}`)
    }
    getOrderByProductId(pId: string) {
      return this.http.get(`${this.apiURL}/orders/product/${pId}`)
    }
}
