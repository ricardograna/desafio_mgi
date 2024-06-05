import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
      return next.handle(request).pipe(catchError(err => {
          if ([401, 403].includes(err.status)) {
              localStorage.removeItem('access_token');
              this.router.navigateByUrl("/login");
          } else {
            this.snackBar.open('Erro ao processar a operação');
          }

          const error = err.error?.message || err.statusText;
          console.error(err);
          return throwError(() => error);
      }))
  }
}
