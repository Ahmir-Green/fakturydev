import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "./product.modal";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }

  // Define API
  apiURL = 'https://localhost:3000/api';


  // save product to db
  addProduct(data: any)
    {
      return this.http.post(`${this.apiURL}/products/`, data)
        .subscribe((res: any) => {
          this.toastr.success(res.message);
        })
    }

    // update product in db
  updateProduct(id : string, data: any)
  {
    return this.http.patch(`${this.apiURL}/products/${id}`, data)
      .subscribe((res: any) => {
        this.toastr.success(res.message);
      })
  }

  // delete product from db
  deletePost(productId: string) {
    console.log(productId)
    this.http
      .delete(`${this.apiURL}/products/` + productId)
      .subscribe((data: any) => {
      });
  }

  // HttpClient API get() method => Fetch All Products
  getPosts(): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}/products/`)

  }
}