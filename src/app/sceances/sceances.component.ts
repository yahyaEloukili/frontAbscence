import { Component, OnInit } from '@angular/core';
import { LoginService } from "../services/login.service";
import { ResourceService } from '../services/resource.service';
import { Module } from "../models/module";
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-sceances',
  templateUrl: './sceances.component.html',
  styleUrls: ['./sceances.component.css']
})
export class SceancesComponent implements OnInit {
  courses: Module[]
  size = 3;
  page = 0;
  totalPages;
  currentKeyword;
  pages: Array<number>;
  sceances;
  role: any;
  selected: any;
  filterForm: any;
  white;
  mySubscription: any;
  id;
  constructor(private loginService: LoginService, private resourceService: ResourceService, private router: Router, private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    let email = this.loginService.getLoggedInUser()["sub"];
    console.log(email);
    this.resourceService.getUserofEmail(email).subscribe(data => {
      this.resourceService.getResourcesOfResource("utilisateurs", "cours", data["id"]).subscribe(data => {
        this.courses = data["_embedded"].courses;
      })
    })

    let data = await this.resourceService.getUserofEmail2(email);
    this.id = data["id"]
    this.filterForm = this.fb.group({
      keyword: []
    })
    this.filtrerUtilisateurs();

  }
  delete(id) {
    if (confirm("tu est sur de vouloir supprimer cet élement")) {
      this.resourceService.deleteResource("sceances", id).subscribe(() => {

        this.filtrerUtilisateurs();
        console.log(this.page);
      }
      );



    }


  }


  goToPage(i) {
    this.page = i;
    this.filtrerUtilisateurs();
  }


  filtrerUtilisateurs() {
    this.resourceService.getSceancesByUser(this.page, this.size, this.id).subscribe(data => {
      console.log(data);
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
      this.sceances = data["sceances"];

    }, err => {
      if (err.status === 403 || !localStorage.getItem('token')) {
        this.loginService.logout();
        this.router.navigateByUrl("/login");

      }
    })
  }

}
