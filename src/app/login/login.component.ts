import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import { Page } from "tns-core-modules/ui/page/page";
import {AuthService} from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	isLoggingIn = true;
	username: any;
	password:any;
	constructor(private router: Router, private authService:AuthService) { 
		//this.page.actionBarHidden = true;
	}

	ngOnInit() { }

	toggleForm() {
		this.isLoggingIn = !this.isLoggingIn;
	}

	doLogin() {
		if(!this.username){
			alert('Enter UserName');
		}else if(!this.password){
			alert('Enter Password');
		} else
		{
			const loginReqData = {
				usernameOrEmail:this.username,
				password:this.password
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
	  }

	  goToSignUp(){
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
		this.password.nativeElement.focus();
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

