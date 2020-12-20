import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = this.authenticationService.currentUserValue;

        if (currentUser && currentUser.AuthData != '') {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${currentUser.AuthData}`
                }
            });
        }

        return next.handle(request);
    }
}