import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        // authorised so return true
        if (sessionStorage.getItem('token') != null) {
            return true;
        }
        // alert('You are not allowed to view this page');
        this.router.navigate(['/instagamer/login']);
        return false;

    }
}