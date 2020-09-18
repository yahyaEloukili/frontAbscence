import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {


  url = 'http://localhost:8080';
  constructor(private http: HttpClient, private loginService: LoginService) { }
  getResource(resource: string, page?, size?) {

    return this.http.get(`${this.url}/${resource}?page=${page}&size=${size}`);
  }
  getRoles() {
    return this.http.get(`${this.url}/roles`);
  }
  getResourceById(resource: string, id) {

    return this.http.get(`${this.url}/${resource}/${id}`);
  }
  getResourceById2(resource: string, id) {

    return this.http.get(`${this.url}/${resource}/${id}/roles`);
  }
  deleteResource(resource: string, id) {
    console.log("done");
    return this.http.delete(`${this.url}/${resource}/${id}`);
  }
  register(resource: string, user) {
    return this.http.post(`${this.url}/${resource}`, user);
  }
  updateUser(resource: string, user) {
    return this.http.put(`${this.url}/${resource}`, user);
  }
  public getResourceByRole(resource, page: number, size: number, id: string, nom?: string) {

    if (nom) {
      return this.http.get(`${this.url}/v2/roles/${id}/${resource}?page=${page}&size=${size}&nom=${nom}`);
    } else {
      console.log("object");
      return this.http.get(`${this.url}/v2/roles/${id}/${resource}?page=${page}&size=${size}`);
    }
  }
  public updateRoles(resource, id) {
    this.http.put(`${this.url}/${resource}`, [`${this.url}/${resource}/${id}/"roles"`])
  }
}
