import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  confirmPassword:string;
  constructor(private authService:AuthService) { }

  ngOnInit() {

  }

  doSignUp() {
    if(this.model.password !== this.confirmPassword) {
      alert("Your passwords do not match.");
			return;
    } else {
      this.authService.register(this.model).subscribe(
        () => {
          alert('Register Successfully');
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}

