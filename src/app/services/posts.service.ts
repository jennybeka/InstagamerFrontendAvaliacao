import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  /**Setar todoas os posts de quem eu sigo */
  getProfileFriend(page: number, idFriend:number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
   
    return this.http.get(`http://localhost:3001/instagamer/home/friend/${page}/${idFriend}`, { headers });
  }

  /**Setar as informações de uma foto especifica, comentarios, likes e tags */
  getPhotoDetails(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.get(`http://localhost:3001/instagamer/posts/photo/${id}`, { headers });
  }

  getCheckLike(idphoto: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`http://localhost:3001/instagamer/photo/like/${idphoto}`, { headers });
  }

  like(idphoto: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`http://localhost:3001/instagamer/posts/like/${idphoto}`, { headers });
  }

  dislike(idphoto: number) {

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.delete(`http://localhost:3001/instagamer/posts/dislike/${idphoto}`, { headers });
  }

  createComment(comment_text: string, photoId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`http://localhost:3001/instagamer/posts/postcomment`, { comment_text, photoId }, { headers });
  }

  getDeleteComment(idComment: number) {

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.delete(`http://localhost:3001/instagamer/posts/comment/${idComment}`, { headers });
  }



}
