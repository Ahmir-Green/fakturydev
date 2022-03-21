import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  // base url
  baseUrl: string = "https://www.faktury.dev/api/checkout/"
  
  constructor(private http: HttpClient) { }
  
  makePayment(data: any): Observable<any>{
    return this.http.post<any>(this.baseUrl,{data})
  }
}
