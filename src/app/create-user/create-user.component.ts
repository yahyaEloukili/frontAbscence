import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ResourceService } from '../services/resource.service';
import { User } from "../models/User";
import { Role } from "../models/Role";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User = {
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adress: "",
    gender: "",
    roles_id: "",
    access: true,
    cne: ""
  };
  roles: Role[];
  verify: boolean = false;
  clicked: boolean;
  emailError: boolean = false;
  ngOnInit(): void {
    this.resourceService.getResourceByRole("utilisateurs", 0, 2, "1").subscribe(data => {


    }, err => {
      if (err.status === 403 || !localStorage.getItem('token')) {
        this.loginService.logout();
        this.router.navigateByUrl("/login");

      }
    })
    this.resourceService.getRoles().subscribe(roles => {
      this.roles = roles["_embedded"].roles;
    })
  }
  constructor(private resourceService: ResourceService, private loginService: LoginService, private router: Router) {

  }
  submitUser(useform: NgForm) {

    useform.value.roles_id = Array.from(String(useform.value.roles_id));
    console.log(useform.value.roles_id);
    if (useform.valid) {
      this.resourceService.register("register", useform.value).subscribe(() => {
        this.emailError = false;
        this.verify = false;
        useform.reset();

      }, err => {
        if (err.error.message === "user already exist") {
          this.emailError = true;
          this.verify = false;

        }
      });

    }
    else {
      this.verify = true;
      this.emailError = false;

    }

  }


}
