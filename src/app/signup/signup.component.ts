import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user.model';
import { AlertifyService } from '../service/alertify.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  signupForm: FormGroup;
  submitted = false;
  confirmPassword:string;
  constructor(private formBuilder: FormBuilder, private authService:AuthService, private alertify:AlertifyService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  passwordConfirming() {
    // tslint:disable-next-line:max-line-length
    if (this.signupForm.controls.password.value !== this.signupForm.controls.confirmPassword.value && this.signupForm.controls.confirmPassword.value !== '') {
        return false;
    }
    return true;
  }
  

  doSignUp() {
    this.submitted = true;
    if (this.signupForm.invalid || !this.passwordConfirming()) {
      return;
    } else {
      const reqData = {
        name:this.signupForm.controls.name.value,
        username:this.signupForm.controls.userName.value,
        email: this.signupForm.controls.email.value,
        password: this.signupForm.controls.password.value
      }
      console.log(reqData);
      this.authService.register(reqData).subscribe(
        () => {
          this.alertify.success('Register Successfully');
          this.router.navigate(["/login"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}

