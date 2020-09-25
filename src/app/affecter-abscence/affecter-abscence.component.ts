import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-affecter-abscence',
  templateUrl: './affecter-abscence.component.html',
  styleUrls: ['./affecter-abscence.component.css']
})
export class AffecterAbscenceComponent implements OnInit {
  justified;
  id;
  id2: any;
  constructor(private resourceService: ResourceService, private loginService: LoginService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id1"];
    this.id2 = this.route.snapshot.params["id2"];

  }
  submit(form: NgForm) {
    if (form.value.justified === "oui") {
      form.value.justified = true;
    } else {
      form.value.justified = false;

    }
    form.value.utilisateur = `${this.loginService.host}/utilisateurs/${this.id}`
    form.value.sceance = `${this.loginService.host}/sceances/${this.id2}`
    form.value.affected = true

    console.log(form.value);
    this.resourceService.addResource("abscences", form.value).subscribe(data => {
      console.log(data);
    })

  }
}
