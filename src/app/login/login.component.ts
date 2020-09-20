import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  user;
  errorForm = false;
  validationMessages = {

    email: {
      email: "cet email n'est pas valide",
      required: 'Cette valeur ne doit pas etre vide !'
    },
    password: {

      required: 'Cette valeur ne doit pas etre vide !',
      minlength: "min is 2"
    }
  };
  formErrors = {

    email: '',
    password: ''
  };
  badCredentieals: boolean = false;
  notValidAtSubmit: any;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.isAdmin()) {
      this.router.navigateByUrl("/administrateurs")
    }
    if (this.loginService.isProf()) {

      this.router.navigateByUrl("/sceances")
    }
    this.userForm = this.fb.group({

      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(2)]]

    })
    this.userForm.valueChanges.subscribe(value => {
      this.logValidationErrors(this.userForm)
    })

  }
  saveLogin() {
    this.errorForm = false;
    this.badCredentieals = false;
    console.log(this.userForm.value);
    if (this.userForm.valid) {

      this.loginService.authenticate(this.userForm.value).subscribe(resp => {

        let jwt = resp.headers.get('Authorization');
        this.loginService.saveToken(jwt);
        if (this.loginService.isAdmin) {
          this.router.navigateByUrl('/administrateurs');
        }
        if (this.loginService.isProf()) {
          this.router.navigateByUrl('/sceances');
        }
      }, err => {
        this.badCredentieals = true;
      })
    } else {
      this.logValidationErrors2();
      this.notValidAtSubmit = true;
      this.errorForm = true;


    }

  }
  logValidationErrors(group: FormGroup = this.userForm) {
    console.log("object");
    Object.keys(group.controls).forEach((key => {
      let abstratControl = group.get(key);
      if (abstratControl instanceof FormGroup) {
        this.logValidationErrors(abstratControl);
      } else {
        this.formErrors[key] = ''
        if (abstratControl && !abstratControl.valid && (((abstratControl.touched || abstratControl.dirty) && !this.notValidAtSubmit) || (this.notValidAtSubmit))) {

          let messages = this.validationMessages[key];
          for (const errorKey in abstratControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }

    }))
  }
  logValidationErrors2(group: FormGroup = this.userForm) {
    Object.keys(group.controls).forEach((key => {
      let abstratControl = group.get(key);
      if (abstratControl instanceof FormGroup) {
        this.logValidationErrors(abstratControl);
      } else {
        this.formErrors[key] = ''
        if (abstratControl && !abstratControl.valid) {

          let messages = this.validationMessages[key];
          for (const errorKey in abstratControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }

    }))
  }
}
