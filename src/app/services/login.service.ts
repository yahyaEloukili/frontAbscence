import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelper } from "angular2-jwt";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public host: string = "http://localhost:8080";
  private roles: Array<any>;
  public jwtToken = null;
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
  isAdmin() {
    this.jwtToken = localStorage.getItem("token");
    let jwtHelper = new JwtHelper();
    if (this.jwtToken) {


      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;


      if (this.roles) {
        for (let r of this.roles) {
          if (r.authority == 'Admin') {
            return true;
          }
          return false;
        }
      }
    } else {
      return false;
    }
  }
  getLoggedInUser() {
    this.jwtToken = localStorage.getItem("token");
    let jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(this.jwtToken);
  }
  isEtudiant() {
    this.jwtToken = localStorage.getItem("token");
    let jwtHelper = new JwtHelper();
    if (this.jwtToken) {


      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;


      if (this.roles) {
        for (let r of this.roles) {
          if (r.authority == 'Etudiant') {
            return true;
          }
          return false;
        }
      }
    } else {
      return false;
    }
  }
  isProf() {
    this.jwtToken = localStorage.getItem("token");
    let jwtHelper = new JwtHelper();
    if (this.jwtToken) {


      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;


      if (this.roles) {
        for (let r of this.roles) {
          if (r.authority == 'Prof') {
            return true;

          }
          return false;
        }
      }
    } else {
      return false;
    }
  }
  logout() {

    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }
}
