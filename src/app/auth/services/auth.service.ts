import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { pipe, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = environment.apiUrl;
  private _auth: Auth | undefined

  get auth() {
    return { ...this._auth! }
  }

  constructor(private http: HttpClient) { }

  checkAuth(): Observable<boolean>{

    if(!localStorage.getItem('id')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map(auth=>{
        this._auth=auth;
        return true}
      )
    )
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
        .pipe(
          tap(auth=>this._auth=auth),
          tap(auth=>localStorage.setItem('id', auth.id))
        );
  }
}
