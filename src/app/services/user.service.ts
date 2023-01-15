import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {headers: {'x-token': this.token}}
  }

  logout() {
    localStorage.removeItem('token');

    this.ngZone.run(() => this.router.navigateByUrl('/login'));
  }

  validateToken() {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp:any) => {
        const { username, email, weight, height, gender, uid, age, activity } = resp.user;

        this.user = new User(username, email, '', weight, height, gender, uid, age, activity);
        localStorage.setItem('token', resp.token);
        
        return true;
      }),
      catchError(error => {
        return of(false);
      })
    );
  }

  login(formData:any) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  updateUser(data: any) {
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
  }

}
