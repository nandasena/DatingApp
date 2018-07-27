import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';
import { AlertyfyService } from '../_services/alertyfy.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertyfyService) {
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('you shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
