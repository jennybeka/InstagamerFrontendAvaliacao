import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  /**busque os users */
  getAllUsers(page: number, paramInput: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.get(`http://localhost:3001/instagamer/posts/all/${page}/${paramInput}`, { headers } );
  }




}
