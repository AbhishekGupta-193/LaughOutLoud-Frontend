import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Application/dashboard/dashboard.component';
import { SigninComponent } from './Authentication/signin/sign-in.component';
import { SignupComponent } from './Authentication/signup/sign-up.component';
import { ChatboxComponent } from './Application/chatbox/chatbox.component';
import { ProfileComponent } from './Application/profile/profile.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    children:[
      {
        path:"chat",
        component:ChatboxComponent
      },
      {
        path:'profile/:id',
        component:ProfileComponent
      }
    ]
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
