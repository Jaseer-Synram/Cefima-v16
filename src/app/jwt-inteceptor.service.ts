import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Authorization header with jwt token if available
    let token = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          //this.authenticationService.logout();
          // location.reload(true);
          location.reload();
        }

        const error = err.error?.message || err.statusText;
        return throwError(error);
      })
    );
    //return next.handle(request);
  }
}
