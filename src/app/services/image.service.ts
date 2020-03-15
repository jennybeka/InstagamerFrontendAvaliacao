import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  private images:object[] = [];
  private url: string = 'https://api.imgur.com/3/image';
  private clientId: string = '4dcb22688543dcf';
  imageLink:any;

  constructor(private http:HttpClient) { }

  uploadImage(imageFile:File): Observable<any> {
    let formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
 
    let header = new HttpHeaders({
      "authorization": 'Client-ID '+ this.clientId
    });
   
    return this.http.post(this.url, formData, {headers:header});
 
  }
 
  getImages(){
    return this.images;
  }
}

