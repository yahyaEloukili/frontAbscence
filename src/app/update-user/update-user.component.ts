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

  ngOnInit(): void {
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
        this.resourceService.getResourceById2("utilisateurs", this.id).subscribe(data => {

          this.user.roles_id = data['_embedded'].roles[0].id
          console.log(data['_embedded'].roles[0].id);
        })
        this.user = data;



      }
    );

    this.resourceService.getRoles().subscribe(roles => {
      this.roles = roles["_embedded"].roles;
    })
  }
  constructor(private resourceService: ResourceService, private route: ActivatedRoute, private loginService: LoginService, private router: Router) {

  }
  submitUser(useform: NgForm) {

    useform.value.roles_id = Array.from(String(useform.value.roles_id));
    this.user = useform.value;
    this.user.id = this.id;
    if (useform.valid) {
      this.resourceService.updateUser("updateUser", this.user).subscribe(() => {
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
