import { Component } from '@angular/core';
import { HttpService } from './sharedData/http.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SignInService } from './sharedData/sign-in.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SigninComponent {
  signInForm!: FormGroup;
  username: string = '';
  password: string = '';

  constructor(private formbuilder: FormBuilder, private http: HttpService, private signinService:SignInService,private router:Router) {
    this.signInForm = formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onsignInFormSubmit() {
    console.log(this.signInForm.value);
    this.username = this.signInForm.get('username')?.value;
    this.password = this.signInForm.get('password')?.value;
    const credentials:any = {
      "username":this.username,
      "password":this.password
    }
    this.http.signIn("/login",credentials).subscribe({
      next:(res:any)=>{
        console.log("login successful : ",res);
        alert("Congratulations! You are logged in.")
        this.signinService.updateUser(res);
        this.router.navigate(['/']);
        
      },
      error:(err:string)=>{
        alert("Oops! Invalid Credentials.")
        console.log("error in login : ",err);
      }
    })

  }
  
  notImplementedYet(){
    alert("Have patience! Functionality is not implemented yet.")
  }
}
