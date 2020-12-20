import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/_services/auth.service';



@Injectable({ providedIn: 'root' })
export class Authenthication implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUserLoggedIn = this.authenticationService.currentUserValue;
        
        console.log('auth');
        console.log(currentUserLoggedIn);

        if (currentUserLoggedIn && currentUserLoggedIn.AuthData != ''){
            return true;
        }
        
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}