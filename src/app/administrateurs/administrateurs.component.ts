import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { ResourceService } from "../services/resource.service";
import 'jquery';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-administrateurs',
  templateUrl: './administrateurs.component.html',
  styleUrls: ['./administrateurs.component.css']
})
export class AministrateursComponent implements OnInit {
  size = 6;
  page = 0;
  totalPages;
  currentKeyword;
  pages: Array<number>;
  utilisateurs;
  role: any;
  selected: any;
  filterForm: any;
  white;
  constructor(public loginService: LoginService, private router: Router, private resourceService: ResourceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      keyword: []
    })
    this.filtrerUtilisateurs();

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
    this.resourceService.getResourceByRole("utilisateurs", this.page, this.size, "3", this.currentKeyword).subscribe(data => {
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
    this.router.navigate([`/updtaeUtilisateur/${id}`]);
  }
}
