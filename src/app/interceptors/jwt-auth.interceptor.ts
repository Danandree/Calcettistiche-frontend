import { HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const jwtAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);

  req = req.clone({
    headers: req.headers.set('Content-Type', 'application/json'),
    withCredentials: true
  });

  return next(req).pipe(
    catchError((err) => {
      if (err.status == 401) {
        console.log('USER UNAUTHORIZED');
        localStorage.removeItem('USER_ID');
        router.navigate(['/home']);
      }
      if (err.status == 403) {
        console.log('USER FORBIDDEN');
        // Aprire un dialog al posto di cambiare pagina?
        router.navigate(['/forbidden']);
      }
      if (err.status == 400 && err.error == 'User id not valid') {
        console.log('USER BAD REQUEST, USER ID NOT VALID');
        router.navigate(['/users']);
      }
      if (err.status == 400 && err.error == 'Match id not valid') {
        console.log('MATCH BAD REQUEST, MATCH ID NOT VALID');
        router.navigate(['/matches']);
      }
      return throwError(() => err);
    })
  );
}
