import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {


  url = 'http://localhost:8080';
  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllResource(resource) {
    return this.http.get(`${this.url}/${resource}`)
  }
  getResourceById(resource: string, id) {

    return this.http.get(`${this.url}/${resource}/${id}`);
  }
  getResourcesOfResource(resource1: string, resource2: string, id) {

    return this.http.get(`${this.url}/${resource1}/${id}/${resource2}`);
  }
  deleteResource(resource: string, id) {

    return this.http.delete(`${this.url}/${resource}/${id}`);
  }

  addResource(resource: String, data) {
    return this.http.post(`${this.url}/${resource}`, data);
  }
  updateResource(resource: string, user) {
    return this.http.put(`${this.url}/${resource}`, user);
  }
  getModule(resource: string, page?, size?, keyword?: string) {
    if (keyword) {
      return this.http.get(`${this.url}/${resource}/search/moduleByKeyWord?page=${page}&size=${size}&nom=${keyword}`);
    } else {
      return this.http.get(`${this.url}/${resource}?page=${page}&size=${size}`);
    }
  }
  getModulesOfUser(id): Promise<any> {

    return this.http.get(`${this.url}/utilisateurs/${id}/cours`).toPromise();

  }

  public getResourceByRole(resource, page: number, size: number, id: string, nom?: string) {

    if (nom) {
      return this.http.get(`${this.url}/v2/roles/${id}/${resource}?page=${page}&size=${size}&nom=${nom}`);
    } else {
      console.log("object");
      return this.http.get(`${this.url}/v2/roles/${id}/${resource}?page=${page}&size=${size}`);
    }
  }

}
