import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private User = new BehaviorSubject<any>(null);
  userDetails = this.User.asObservable();

  constructor() { }

  updateUser(user:any){
    this.User.next(user);
  }

  //for auth guard 
  get currentUserValue():any{
    return this.User.value;
  }
}
