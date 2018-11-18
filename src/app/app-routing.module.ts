import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGaurdService } from './services/auth-gaurd.service';

const routes:Routes=[
   { path:'' , component:PostListComponent },
   { path:'create' , component:PostCreateComponent, canActivate:[ AuthGaurdService ] },
   { path:'edit/:postid' , component:PostCreateComponent,canActivate:[ AuthGaurdService ] },
   { path:'login' , component:LoginComponent },
   { path:'signup' , component:SignupComponent },

];


@NgModule({
   
    imports:[ RouterModule.forRoot(routes) ],
    exports: [RouterModule]

})

export class AppRoutingModule
{

}