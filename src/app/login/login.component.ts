import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page } from "tns-core-modules/ui/page/page";
import {AuthService} from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	submitted = false;
	isLoggingIn = true;
  
	constructor(private formBuilder: FormBuilder, private router: Router, private authService:AuthService) { }
  
	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}
	// convenience getter for easy access to form fields
	get f() {
	  return this.loginForm.controls;
	}
  
  
	doLogin() {
	  this.submitted = true;
	  if (this.loginForm.invalid) {
		return;
	  } else {
		  const loginReqData = {
			  usernameOrEmail:this.loginForm.controls.email.value,
			  password:this.loginForm.controls.password.value
		  }
		  this.authService.login(loginReqData).subscribe(
			  () => {
				  this.router.navigate(["/home"]);
			  },
			  error => {
				  console.log(error);
			  }
		  );
	  }
	
	  console.log('Logged In');
	}
	goToSignUp() {
		this.router.navigate(["/signup"]);
	}

	

	

	forgotPassword() {
		// prompt({
		// 	title: "Forgot Password",
		// 	message: "Enter the email address you used to register for APP NAME to reset your password.",
		// 	inputType: "email",
		// 	defaultText: "",
		// 	okButtonText: "Ok",
		// 	cancelButtonText: "Cancel"
		// }).then((data) => {
		// 	if (data.result) {
		// 		// this.userService.resetPassword(data.text.trim())
		// 		//     .then(() => {
		// 		//         this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
		// 		//     }).catch(() => {
		// 		//         this.alert("Unfortunately, an error occurred resetting your password.");
		// 		//     });
		// 	}
		// });
	}

	focusPassword() {
		//this.password.nativeElement.focus();
	}

	focusConfirmPassword() {
		if (!this.isLoggingIn) {
			//this.confirmPassword.nativeElement.focus();
		}
	}

	alert(message: string) {
		return alert({
			title: "POSTERNS",
			okButtonText: "OK",
			message: message
		});
	}
  }

