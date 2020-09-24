import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { Sceance } from '../models/sceance';
import { LoginService } from '../services/login.service';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-add-sceance',
  templateUrl: './add-sceance.component.html',
  styleUrls: ['./add-sceance.component.css']
})
export class AddSceanceComponent implements OnInit {

  sceance: Sceance = {

    date: "",
    debut: "",
    fin: "",

  };
  courses;
  cours;
  idUser;
  verify: boolean = false;
  clicked: boolean;
  duplicate: boolean;

  ngOnInit(): void {
    let email = this.loginService.getLoggedInUser()["sub"];
    console.log(email);
    this.resourceService.getUserofEmail(email).subscribe(data => {

      this.resourceService.getResourcesOfResource("utilisateurs", "cours", data["id"]).subscribe(data => {
        this.courses = data["_embedded"].courses;
      })
    })
    this.resourceService.getResourceByRole("utilisateurs", 0, 2, "1").subscribe(data => {


    }, err => {

      if (err.status === 403 || !localStorage.getItem('token')) {
        this.loginService.logout();
        this.router.navigateByUrl("/login");

      }

    })

  }
  constructor(private resourceService: ResourceService, private loginService: LoginService, private router: Router) {

  }
  async submitModule(useform: NgForm) {
    // useform.value.cours = [`${this.loginService.host}/cours/${useform.value.cours}`]

    if (useform.valid) {
      let module = `${this.loginService.host}/courses/${useform.value.cours}`
      let email = this.loginService.getLoggedInUser()["sub"];



      let data2 = await this.resourceService.getUserofEmail2(email);
      let user = `${this.loginService.host}/utilisateurs/${data2["id"]}`
      useform.value.utilisateur = user;

      useform.value.cours = module;
      console.log(useform.value, "***************");
      this.resourceService.addResource("sceances", useform.value).subscribe((data) => {
        console.log(data);
        this.verify = false;
        this.duplicate = false;
        useform.reset();

      }, err => {
        if (err.error.cause.cause.message.startsWith('Duplicate entry')) {
          this.duplicate = true;
          this.verify = false;
        }

      });


    }
    else {
      this.verify = true;


    }


  }


}
