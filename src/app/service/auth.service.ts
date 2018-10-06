import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {apiUrls} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userToken: any;
  decodedToken: any;
  constructor(private http: Http) {}

  login(model: any) {
    return this.http
      .post(apiUrls.baseUrl + apiUrls.authenticateUser, model, this.requestOptions())
      .pipe(
        map((response: Response) => {
          const user = response.json();
          console.log(user);
          if (user && user.accessToken) {
            localStorage.setItem('socialtoken', user.accessToken);
            localStorage.setItem('socialtokentype', user.tokenType);
            //this.userToken = user.tokenString;
            //console.log(this.decodedToken);
          }
        }),
        catchError(this.handleError)
      );
  }

  register(model: any) {
    return this.http
      .post(apiUrls.baseUrl + apiUrls.registerUser, model, this.requestOptions())
      .pipe(catchError(this.handleError));
  }
  loggedIn() {
    //return !this.jwtHelper.isTokenExpired();
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