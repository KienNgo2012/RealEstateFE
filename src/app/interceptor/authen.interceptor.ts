import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authenService: AuthenticationService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authenService.getAuthorizationToken();
    req = !!authToken
      ? req.clone({
          headers: req.headers.set('Authorization', authToken),
        })
      : req;

    return next.handle(req).pipe(
      catchError((error) => {
        let handled: boolean = false;

        const authenticatedError =
          error instanceof HttpErrorResponse &&
          !(error.error instanceof ErrorEvent);

        if (authenticatedError) {
          switch (error.status) {
            case 401:
            case 403:
              this.authenService.setAuthenticationInfo(undefined);
              this.router.navigateByUrl('/login');
              handled = true;
              break;
          }
        }

        if (handled) {
          return of(error);
        } else {
          throw error;
        }
      })
    );
  }
}
