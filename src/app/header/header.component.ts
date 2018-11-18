import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private getAuthListenerSubs : Subscription;
  userIsAuthenticated = false;
  constructor(private _authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this._authService.isAuthenticated;
     this.getAuthListenerSubs =  this._authService.getAuthStatusListener()
     .subscribe((isAuthenticated)=>{
          this.userIsAuthenticated = isAuthenticated;
     });
  }
 ngOnDestroy()
 {
   this.getAuthListenerSubs.unsubscribe();
 }

 logout()
 {
   this._authService.onLogOut();
 }

}
