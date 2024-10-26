import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { HttpService } from './sharedData/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent {
  signUpForm!:FormGroup;
  username: string = '';
  password: string = '';

  constructor (private http:HttpService,private formbuilder:FormBuilder,private router:Router){
    this.signUpForm = formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
    })
  }

  onsignUpFormSubmit(){
    this.username=this.signUpForm.get('username')?.value;
    this.password=this.signUpForm.get('password')?.value;

    const payload:any ={
      username:this.username,
      password:this.password
    }

    this.http.SignUp("/register",payload).subscribe({
      next:(res:any)=>{
        console.log("Signup successful : ",res);
        alert("Congratulations! Sign Up is successful.")
        this.router.navigate(['/signin']);
      },
      error:(err:any)=>{
        alert("Oops! Sign Up failed.")
        console.log("Signup Failed : ",err);
      }
    })
  }

  notImplementedYet(){
    alert("Have patience! Functionality is not implemented yet.")
  }
}
