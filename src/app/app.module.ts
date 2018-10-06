import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import {
//   SocialLoginModule,
//   AuthServiceConfig,
//   GoogleLoginProvider,
//   FacebookLoginProvider,
// } from "angular5-social-login";
import { SocialsigninComponent } from './socialsignin/socialsignin.component';
import { SignupComponent } from './signup/signup.component';
var $ = require("jquery");

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SocialsigninComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
    // SocialLoginModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
