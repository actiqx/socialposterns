import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SocialService } from '../service/social.service';
import { CommonService } from '../service/common.service';
declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit, AfterViewInit {
  title = 'posterns';
  socialAuth:any = {facebookUrl:"", googleplusUrl:""};
  socialToken:any = {facebookToken:"", googleplusToken:""}
  constructor(private socialService:SocialService, private activeRoute:ActivatedRoute, private commonService:CommonService) {
    if(JSON.parse(this.commonService.getLocalStorageByKey("SocialToken")) !== null){
      this.socialToken = JSON.parse(this.commonService.getLocalStorageByKey("SocialToken"));
    } else {
      this.commonService.setLocalStorageByKey("SocialToken",this.socialToken)
    }
    
    socialService.getAuthUrl()
    .subscribe((data:any)=> {
      this.socialAuth.facebookUrl = data._body;
      console.log("Facebook", this.socialAuth.facebookUrl);
  });
  // This function initializes the FB variable 
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


window.fbAsyncInit = () => {
    console.log("fbasyncinit")

    FB.init({
        appId            : 'facebook app id here',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.10'
    });
    FB.AppEvents.logPageView();
    // This is where we do most of our code dealing with the FB variable like adding an observer to check when the user signs in

// ** ADD CODE TO NEXT STEP HERE **
};

   }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if(params.hasOwnProperty('code') && this.socialToken.facebookToken === ""){
        if(params['page'] === 'facebook'){
          this.socialService.getFacebookToken(params['code']).subscribe((data:any)=> {
            this.socialToken.facebookToken = data._body;
            console.log("Facebook", data);
        });
        }
      }
      localStorage.setItem("SocialToken", JSON.stringify(this.socialToken));
    })
    if (window.FB) {
      window.FB.XFBML.parse();
  }
  }

  ngAfterViewInit(){
    this.fbBtnClick();
  }
   fbBtnClick() {
    var js, fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById('fb-root')) return;
    js = document.createElement('script'); js.id = 'fb-root';
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=489733744550322&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }
  



  signInApp(appKey){
    switch(appKey){
      case 'facebook':
          console.log("Facebook");
          window.open(this.socialAuth.facebookUrl, "_self");
          break;
      case 'google-plus':
          console.log("google-plus");
          break;
      default:
          break;
    }

  }
}
