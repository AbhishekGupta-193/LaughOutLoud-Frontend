import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Application/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutDialogComponent } from './Dialog/logout-dialog/logout-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SignupComponent } from './Authentication/signup/sign-up.component';
import { SigninComponent } from './Authentication/signin/sign-in.component';
import { SearchFilterPipe } from './Pipes/search-filter.pipe';
import { ChatboxComponent } from './Application/chatbox/chatbox.component';
import { ProfileComponent } from './Application/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LogoutDialogComponent,
    SignupComponent,
    SigninComponent,
    SearchFilterPipe,
    ChatboxComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
