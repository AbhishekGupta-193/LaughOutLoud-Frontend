import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Application/dashboard/dashboard.component';
import { SigninComponent } from './Authentication/signin/sign-in.component';
import { SignupComponent } from './Authentication/signup/sign-up.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent
  },
  {
    path:"signin",
    component:SigninComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
