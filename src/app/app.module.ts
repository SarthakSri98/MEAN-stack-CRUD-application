import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule,MatCardModule,MatButtonModule,MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BindingService } from './services/binding.service';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post-list/post-list.component'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,MatInputModule,FormsModule,MatCardModule,MatButtonModule,MatToolbarModule,MatDialogModule,
    MatExpansionModule,ReactiveFormsModule,HttpClientModule,AppRoutingModule,MatProgressSpinnerModule,MatPaginatorModule
  ],
  providers: [BindingService,AuthService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor  ,multi:true},AuthGaurdService,
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor ,multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
