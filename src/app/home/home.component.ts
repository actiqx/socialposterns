import { Component, OnInit } from '@angular/core';
import { SocialService } from '../service/social.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'posterns';
  facebookAuthUrl:any;
  constructor(private socialService:SocialService) {
    socialService.getAuthUrl()
    .subscribe((data:any)=> {
      this.facebookAuthUrl = data._body;
      console.log("Facebook", this.facebookAuthUrl);
  });

   }

  ngOnInit() {
  }
  signInApp(appKey){
    switch(appKey){
      case 'facebook':
          console.log("Facebook");
          window.open(this.facebookAuthUrl, "_blank");
          break;
      case 'google-plus':
          console.log("google-plus");
          break;
      default:
          break;
    }

  }
}
