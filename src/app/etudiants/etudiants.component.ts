import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {
  size = 5;
  page = 0;
  totalPages;
  currentKeyword;
  pages: Array<number>;
  utilisateurs;
  role: any;
  selected: any;
  filterForm: any;
  white;
  mySubscription: any;

  constructor(public loginService: LoginService, private router: Router, private resourceService: ResourceService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      keyword: []
    })
    this.filtrerUtilisateurs();

  }
  delete(id) {
    if (confirm("tu est sur de vouloir supprimer cet élement")) {
      this.resourceService.deleteResource("utilisateurs", id).subscribe(() => {

        this.filtrerUtilisateurs();
        console.log(this.page);
      }
      );



    }


  }
  update(id) {
    this.router.navigate([`/updateUtilisateur/${id}`]);
  }

  goToPage(i) {
    this.page = i;
    this.filtrerUtilisateurs();
  }
  onChercher(ev) {
    this.page = 0;
    this.currentKeyword = ev.target.value;

    this.filtrerUtilisateurs();
  }

  filtrerUtilisateurs() {
    this.resourceService.getResourceByRole("utilisateurs", this.page, this.size, "2", this.currentKeyword).subscribe(data => {
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
      this.utilisateurs = data["utilisateurs"];

    }, err => {
      if (err.status === 403 || !localStorage.getItem('token')) {
        this.loginService.logout();
        this.router.navigateByUrl("/login");

      }
    })
  }

}
