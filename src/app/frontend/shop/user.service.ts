import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }
    
    // Define API
    apiURL = 'https://www.faktury.dev/api';

    getUser(email:string) {
      return this.http.get(`${this.apiURL}/users/${email}`)
    }
    
    updateUser(email:string, data: any) {
      this.http.patch(`${this.apiURL}/users/${email}`, data).subscribe((res: any) => {
        this.toastr.success(res.message);
      })
    }
}
