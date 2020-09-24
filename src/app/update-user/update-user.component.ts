import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../models/Role';
import { User } from '../models/User';
import { LoginService } from '../services/login.service';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any = {
    id: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adress: "",
    gender: "",
    roles_id: "",
    cne: "",
    access: true
  };
  roles: Role[];
  verify: boolean = false;
  clicked: boolean;
  emailError: boolean = false;
  id;
  array: any[] = [];
  dropdownList: any;
  selectedItems: any;
  dropdownSettings: {
    singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string;
    // itemsShowLimit: ,
    allowSearchFilter: boolean;
  };

  async ngOnInit(): Promise<any> {

    this.resourceService.getAllResource("courses").subscribe(async data => {

      let modules = await this.resourceService.getModulesOfUser(this.id)

      this.selectedItems = modules['_embedded'].courses
      this.selectedItems.forEach(element => {
        this.array.push(element.id)
      });

      this.dropdownList = data['_embedded'].courses

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
    this.id = this.route.snapshot.params["id"];
    this.resourceService.getResourceById("utilisateurs", this.id).subscribe(
      (data) => {
        this.resourceService.getResourcesOfResource("utilisateurs", "roles", this.id).subscribe(data => {

          this.user.roles_id = data['_embedded'].roles[0].id

        })
        this.user = data;



      }
    );

    this.resourceService.getAllResource("roles").subscribe(roles => {
      this.roles = roles["_embedded"].roles;
    })
  }
  constructor(private resourceService: ResourceService, private route: ActivatedRoute, private loginService: LoginService, private router: Router) {

  }
  onSelect(ev) {

    this.array.push(ev.id);
    console.log(this.array);

  }
  ondeSelectAll(ev) {
    this.array = [];
  }
  onsSelectAll(ev) {
    this.array = [];
    ev.forEach(element => {
      this.array.push(element.id);
    });

  }
  ondeSelect(ev) {

    let array2 = [];
    this.array.forEach(element => {

      if (element != ev.id) {
        array2.push(element);
      }
    })
    this.array = array2;


  }
  submitUser(useform: NgForm) {

    useform.value.roles_id = Array.from(String(useform.value.roles_id));
    useform.value.roles = [`${this.loginService.host}/roles/${useform.value.roles_id}`]
    useform.value.cours = [];
    useform.value.courses_id = this.array;
    this.array.forEach(element => {
      useform.value.cours.push(`${this.loginService.host}/cours/${element}`)
    })
    console.log(useform.value.cours);
    console.log(useform.value.roles);
    this.user = useform.value;
    // this.user.id = this.id;
    if (useform.valid) {
      this.resourceService.updateResource("utilisateurs", this.user, this.id).subscribe(() => {
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
