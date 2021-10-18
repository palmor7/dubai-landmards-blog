import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): Observable<boolean> {
    if (!!localStorage.getItem('session-token')) {
      return of(true);
    } else {
      this.router.navigate(['dubai-landmarks']);
      return of(false);
    }
  }
}
