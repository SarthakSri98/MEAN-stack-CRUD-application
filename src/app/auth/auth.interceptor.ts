import {
  Injectable
} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';
import {
  AuthService
} from '../services/auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {

  }
  intercept(req: HttpRequest < any > , next: HttpHandler) {
    const authToken = this.authService.getToken();
    console.log('auy', authToken)
    if (authToken) {
      const requestAuth = req.clone({
        headers: req.headers.set('authorization', authToken)
      })
      return next.handle(requestAuth);
    } else
      return next.handle(req);

  }
}
