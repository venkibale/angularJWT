import { Injectable } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
        return true;
    }
    else {
    // navigate to login page
    window.sessionStorage.clear();
    this._router.navigate(['/login']);
    }
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
