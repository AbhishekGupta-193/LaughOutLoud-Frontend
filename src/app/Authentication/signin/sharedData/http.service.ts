import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  baseURL:string = "http://localhost:8080/auth";

  signIn(url:String,credentials:any):Observable<any>{
    console.log("signIn API working");
    return this.http.post(this.baseURL+url,credentials);
  }
}
