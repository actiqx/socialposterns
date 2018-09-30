import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'posterns';

  constructor() { }

  ngOnInit() {
  }
  signInApp(appKey){
    switch(appKey){
      case 'facebook':
          console.log("Facebook");
          break;
      case 'google-plus':
          console.log("google-plus");
          break;
      default:
          break;
    }

  }
}
