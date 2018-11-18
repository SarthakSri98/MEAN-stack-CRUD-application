import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { newUser } from './auth.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  isLoading:false;
  private authStateSubscription : Subscription
  constructor(private _authService:AuthService ) { }

  ngOnInit() {
    this.authStateSubscription = this._authService.getAuthStatusListener().subscribe((authStatus)=>{
          this.isLoading = false;
    })
  }
  onSignUp(formValue){
    if(formValue.invalid)
     return;
    else
     this._authService.signUpUser(formValue.value.email,formValue.value.password);  
  }

  ngOnDestroy()
  {
     this.authStateSubscription.unsubscribe();
  }
  
}
