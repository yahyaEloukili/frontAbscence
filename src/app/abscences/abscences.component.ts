import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(public resourceService: ResourceService) { }

  ngOnInit(): void {
  }
  search(form: NgForm) {

    this.resourceService.getSceance(form.value.date, form.value.debut, form.value.fin).subscribe(data => {
      console.log(data);
    })
  }
}
