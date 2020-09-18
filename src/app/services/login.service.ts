import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public host: string = "http://localhost:8080";
  private roles: Array<any>;
  constructor(private http: HttpClient, private router: Router) { }
  public authenticate(user) {
    return this.http.post(this.host + "/login", user, { observe: 'response' });
  }

  saveToken(jwt: string) {

    localStorage.setItem('token', jwt);

  }
  getToken() {
    return localStorage.getItem('token');
  }

  isUserLoggedIn() {
    let user = localStorage.getItem("token");

    if (user) {
      return true;
    }
    return false;
  }
  logout() {

    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }
}
