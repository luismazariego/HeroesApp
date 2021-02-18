import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      // if(this.authService.auth.id){
      //   return true;
      // }

      // return false;
      return this.authService.checkAuth()
      .pipe(
        tap( isAuth=>{
          if(!isAuth){
            this.router.navigate(['./auth/login']);
          }
        } )
      );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      return this.authService.checkAuth()
      .pipe(
        tap( isAuth=>{
          if(!isAuth){
            this.router.navigate(['./auth/login']);
          }
        } )
      );
      
      // if(this.authService.auth.id){
      //   return true;
      // }

      // return false;
      
  }
}
