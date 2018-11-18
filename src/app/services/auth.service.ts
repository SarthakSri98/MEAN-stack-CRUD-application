import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newUser } from '../auth/signup/auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.global_url + 'users/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  private token;
  private expiresIn: Date;
  private authStatusListener = new Subject < boolean > ();
  private tokenTimer: any;
  private userId: string;
  constructor(private http: HttpClient, private router: Router) {

  }



  getToken() {
    console.log('gettoken', this.token);
    return this.token;
  }


  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signUpUser(email, password) {
    const authData: newUser = {
      email: email,
      password: password
    }
    this.http.post(BACKEND_URL+'signup', authData).subscribe(res => {
      console.log(res);
      this.router.navigate(['/']);

    }, error => {
      this.authStatusListener.next(false);
  })
  }
 

  loginUser(email, password) {
    const authData: newUser = {
      email: email,
      password: password
    }
    this.http.post < {
      token: string;expiresIn: number;userId: string
    } > (BACKEND_URL+'login', authData).subscribe(res => {
      const token = res.token; //so that token can be a constant
      this.userId = res.userId;
      const expiresInDuration = res.expiresIn;
      const now = new Date();
      this.setAuthTimer(expiresInDuration);
      this.expiresIn = new Date(now.getTime() + expiresInDuration * 1000);
      this.token = token;
      this.saveAuthData(this.token, this.expiresIn, this.userId);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.router.navigate(['/']);
    },error=>{
      this.authStatusListener.next(false);
  })
  }



  setAuthTimer(duration) {
    this.tokenTimer = setTimeout(() => {
      this.onLogOut();
    }, duration * 1000);
  }


  private getAuthItem() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiresIn');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    } else
      return {
        token: token,
        expiresIn: new Date(expirationDate),
        userId: userId
      }
  }

  autoAuthUser() {
    const authInfo = this.getAuthItem();
    const now = new Date();
    if (!authInfo) {
      return;
    }
    const expiresIn = authInfo.expiresIn.getTime() - now.getTime();
    console.log('timer', authInfo.expiresIn);
    if (expiresIn > 0) {
      this.token = authInfo.token; //so this is received by the localstorage
      this.setAuthTimer(expiresIn / 1000);
      this.userId = authInfo.userId;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }


  saveAuthData(token, expiresIn, userId) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn.toISOString());
    localStorage.setItem('userId', userId)
  }


  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
  }


  onLogOut() {
    this.token = null;
    this.isAuthenticated = true;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['login']);
  }

}
