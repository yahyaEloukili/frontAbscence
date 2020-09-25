import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-abscences',
  templateUrl: './abscences.component.html',
  styleUrls: ['./abscences.component.css']
})
export class AbscencesComponent implements OnInit {
  date;
  debut;
  fin;
  date1;
  page = 0;
  debut1;
  size = 1;
  fin1;
  sceance
  etudiants
  pages: number[];
  totalPages: any;
  constructor(public resourceService: ResourceService, private router: Router) { }

  ngOnInit(): void {


  }

  search(form: NgForm) {
    this.date1 = form.value.date;
    this.debut1 = form.value.debut;
    this.fin1 = form.value.fin;
    this.filtrer();

  }
  filtrer() {
    this.resourceService.getSceance(this.date1, this.debut1, this.fin1).subscribe(data => {
      this.sceance = data;

      this.resourceService.getResourceByCourse("utilisateurs", this.page, this.size, data["id"]).subscribe(data => {
        this.etudiants = data["utilisateurs"];
        this.totalPages = data["totalPages"];
        this.pages = new Array<number>(this.totalPages);
        console.log(this.etudiants);
      })
    })
  }
  goToPage(i) {
    this.page = i;
    this.filtrer();
  }



}
