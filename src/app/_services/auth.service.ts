import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
const AUTH_API = 'http://localhost:5000/';
const helper = new JwtHelperService;
  
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    console.log(credentials)
    return this.http.post<User>(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  isAuthenticated(): boolean {
    
    return sessionStorage.getItem('auth-token') != null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {

    console.log(helper.isTokenExpired(sessionStorage.getItem('auth-token')));
    return helper.isTokenExpired(sessionStorage.getItem('auth-token'));
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }


}

