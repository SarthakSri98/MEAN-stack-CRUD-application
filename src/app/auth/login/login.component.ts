import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnInit {
  isLoading:false;
  private authStateSubscription : Subscription;
  constructor(private _authService:AuthService ) { }

  ngOnInit() {
    this.authStateSubscription = this._authService.getAuthStatusListener().subscribe((authStatus)=>{
      this.isLoading = false;
})
  }
  onLogin(formValue){
    if(formValue.invalid)
    return;
    else
    this._authService.loginUser(formValue.value.email,formValue.value.password);  
  }

  ngOnDestroy()
  {
     this.authStateSubscription.unsubscribe();
  }
}
