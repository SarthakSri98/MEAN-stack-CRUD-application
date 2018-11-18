
  import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpErrorResponse} from '@angular/common/http';
  
  import {Observable, throwError} from 'rxjs';import {  catchError} from 'rxjs/operators';
  import { MatDialog } from '@angular/material';
  import { ErrorComponent } from './error/error.component';
import { Injectable } from '@angular/core';
  
  @Injectable()
  /** Pass untouched request through to the next request handler. */
  export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialog:MatDialog){}

    intercept(req: HttpRequest < any > , next: HttpHandler) {
      
      return next.handle(req).pipe(
         catchError((error: HttpErrorResponse)=>{
           let errorMessage = "An unknown error occured";
           console.log(error);
           if(error.error.message)
           {
             errorMessage = error.error.message;
           }
           this.dialog.open(ErrorComponent,{ data: { message:errorMessage  } });
           return throwError(error);

         })

      )

    }
  }
  