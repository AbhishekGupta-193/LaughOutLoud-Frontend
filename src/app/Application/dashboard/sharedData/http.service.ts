import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  baseURL:string = "http://localhost:8080/api";

  getUsersData(url:String):Observable<any>{
    console.log("getUsersData API working");
    return this.http.get(this.baseURL+url);
  }

  createPost(url:string,payload:any):Observable<any>{
    console.log("createPost Service Working");
    return this.http.post(this.baseURL+url,payload);
  }
}
