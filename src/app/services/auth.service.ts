import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }


  returnIsLoggedIn(): boolean {
    // authorised so return true
    if (sessionStorage.getItem('token') != null) {
      return true;
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3001/instagamer/login', { email, password });

  }

  logout() {
    sessionStorage.removeItem('token');
  }


}
