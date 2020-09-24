import { Component, OnInit } from '@angular/core';
import { LoginService } from "../services/login.service";
import { ResourceService } from '../services/resource.service';
import { Module } from "../models/module";
@Component({
  selector: 'app-sceances',
  templateUrl: './sceances.component.html',
  styleUrls: ['./sceances.component.css']
})
export class SceancesComponent implements OnInit {
  courses: Module[]
  constructor(private loginService: LoginService, private resourceService: ResourceService) { }

  ngOnInit(): void {
    let email = this.loginService.getLoggedInUser()["sub"];
    console.log(email);
    this.resourceService.getUserofEmail(email).subscribe(data => {
      this.resourceService.getResourcesOfResource("utilisateurs", "cours", data["id"]).subscribe(data => {
        this.courses = data["_embedded"].courses;
      })
    })

  }


}
