import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ResourceService } from '../services/resource.service';
import { User } from "../models/User";
import { Role } from "../models/Role";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import 'jquery';
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
    courses_id: "",
    access: true,
    cne: ""
  };
  roles: Role[];
  verify: boolean = false;
  clicked: boolean;
  emailError: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  array: any[];
  onItemSelect(event) {

  }
  ngOnInit(): void {
    this.array = [];
    this.resourceService.getAllResource("courses").subscribe(data => {
      // console.log(data['_embedded'].courses);

      this.dropdownList = data['_embedded'].courses
      this.selectedItems;
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'nom',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        // itemsShowLimit: ,
        allowSearchFilter: true
      };



    })

    this.resourceService.getResourceByRole("utilisateurs", 0, 2, "1").subscribe(data => {


    }, err => {
      if (err.status === 403 || !localStorage.getItem('token')) {
        this.loginService.logout();
        this.router.navigateByUrl("/login");

      }
    })
    this.resourceService.getAllResource("roles").subscribe(roles => {
      this.roles = roles["_embedded"].roles;
    })
  }
  constructor(private resourceService: ResourceService, private loginService: LoginService, private router: Router) {

  }
  onSelect(ev) {
    this.array.push(ev.id);
  }
  onsSelectAll(ev) {
    this.array = [];
    ev.forEach(element => {
      this.array.push(element.id);
    });

  }
  ondeSelectAll(ev) {
    this.array = [];
  }
  ondeSelect(ev) {

    let array2 = [];
    this.array.forEach(element => {

      if (element != ev.id) {
        array2.push(element);
      }
    })
    this.array = array2;
    console.log(this.array);


  }
  submitUser(useform: NgForm) {

    useform.value.roles_id = Array.from(String(useform.value.roles_id));
    useform.value.courses_id = this.array;
    if (useform.valid) {
      this.resourceService.addResource("register", useform.value).subscribe((userform) => {
        this.emailError = false;
        this.verify = false;
        console.log(userform);
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
