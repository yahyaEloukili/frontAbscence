import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from '../models/module';
import { LoginService } from '../services/login.service';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css']
})
export class UpdateModuleComponent implements OnInit {

  module: Module = {
    id: "",
    nom: "",

  };

  verify: boolean = false;
  clicked: boolean;
  duplicate: boolean;
  id: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.resourceService.getResourceById("courses", this.id).subscribe(data => {
      this.module.nom = data["nom"];
      this.module.id = this.id;

    })
    this.resourceService.getResourceByRole("utilisateurs", 0, 2, "1").subscribe(data => {


    }, err => {

      if (err.status === 403 || !localStorage.getItem('token')) {
        this.loginService.logout();
        this.router.navigateByUrl("/login");

      }

    })

  }
  constructor(private resourceService: ResourceService, private loginService: LoginService, private router: Router, private route: ActivatedRoute) {

  }
  submitModule(useform: NgForm) {



    if (useform.valid) {
      this.resourceService.updateResource("courses", useform.value, this.id).subscribe(() => {

        this.verify = false;
        this.duplicate = false;
        useform.reset();

      }, err => {

        if (err?.error?.cause?.cause?.message.startsWith('Duplicate entry')) {
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
