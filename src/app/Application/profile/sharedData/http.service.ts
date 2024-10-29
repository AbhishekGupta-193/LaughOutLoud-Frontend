import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  baseURL:string = "http://localhost:8080/api";

  getUserById(url:String,id:any):Observable<any>{
    console.log("getUserByID Service is working");
    return this.http.get(this.baseURL+url+"/"+id);
  }

  deletePost(url:string,id:any):Observable<any>{
    console.log("deletePost Service Working");
    return this.http.delete(this.baseURL+url+'/'+id);
  }
}
