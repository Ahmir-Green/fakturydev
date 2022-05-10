import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  // base url
  baseUrl = `${environment.apiUrl}/checkout/`;
  
  constructor(private http: HttpClient) { }
  
  makePayment(data: any): Observable<any>{
    return this.http.post<any>(this.baseUrl,{data})
  }
}
