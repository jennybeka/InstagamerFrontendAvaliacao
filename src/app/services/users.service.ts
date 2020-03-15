import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getProfile(page: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`http://localhost:3001/instagamer/profile/${page}`, { headers });
  }

  getMyFriends(page: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`http://localhost:3001/instagamer/home/${page}`, { headers });
  }

  getCheckFollower(friendId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`http://localhost:3001/instagamer/friend/follower/${friendId}`, { headers });
  }

  getFollow(friendId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`http://localhost:3001/instagamer/follow/${friendId}`, { headers });
  }

  getUnFollow(friendId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`http://localhost:3001/instagamer/unfollow/${friendId}`, { headers });
  }

  createPost(image_url: string, text_photo: string, tags_image: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post('http://localhost:3001/instagamer/posts/create', { image_url, text_photo, tags_image }, { headers });
  }

  deleteImage(idphoto: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.delete(`http://localhost:3001/instagamer/posts/${idphoto}`, { headers });
  }



  register(name: string, username: string, email: string, password: string) {
    return this.http.post('http://localhost:3001/instagamer/register', { name, username, email, password });
  }
}
