import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {apiUrls} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  
  userToken: any;
  decodedToken: any;
  constructor(private http: Http) {}

  getAuthUrl() {
    return this.http
    .get(apiUrls.baseUrl + apiUrls.generateAuthUrl, this.jwt())
    .pipe(catchError(this.handleError));
  }

  
  loggedIn() {
    //return !this.jwtHelper.isTokenExpired();
  }

  private jwt() {
    const token = localStorage.getItem('socialtoken');
    if (token) {
      const headers = new Headers({ Authorization: 'Bearer ' + token });
      headers.append('Content-type', 'application/json');
      return new RequestOptions({ headers: headers });
    }
  }

  private requestOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return throwError(applicationError);
    }
    const serverError = error.json();
    let modelStateError = '';
    if (serverError) {
      // tslint:disable-next-line:forin
      for (const key in serverError) {
        modelStateError += serverError[key] + '\n';
      }
    }
    return throwError(modelStateError || 'Server Error');
  }
}