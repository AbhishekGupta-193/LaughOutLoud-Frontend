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
  name:string='';
  mobile_no: string = '';
  password: string = '';

  constructor (private http:HttpService,private formbuilder:FormBuilder,private router:Router){
    this.signUpForm = formbuilder.group({
      name:['',Validators.required],
      mobile_no:['',Validators.required],
      password:['',Validators.required],
    })
  }

  onsignUpFormSubmit(){
    this.name=this.signUpForm.get('name')?.value;
    this.mobile_no=this.signUpForm.get('mobile_no')?.value;
    this.password=this.signUpForm.get('password')?.value;

    const payload:any ={
      name:this.name,
      mobileNo:this.mobile_no,
      password:this.password
    }

    this.http.SignUp("/registerUser",payload).subscribe({
      next:(res:any)=>{
        console.log("Signup successful : ",res);
        alert("Congratulations! Sign Up is successful.")
        this.router.navigate(['/']);
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
