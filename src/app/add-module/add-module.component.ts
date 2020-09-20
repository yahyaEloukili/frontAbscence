import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ResourceService } from '../services/resource.service';
import { Module } from "../models/module";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {

  module: Module = {

    nom: "",

  };

  verify: boolean = false;
  clicked: boolean;

  ngOnInit(): void {
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
  submitModule(useform: NgForm) {



    if (useform.valid) {
      this.resourceService.addResource("courses", useform.value).subscribe(() => {

        this.verify = false;
        useform.reset();

      }, err => {

      });

    }
    else {
      this.verify = true;


    }

  }

}
