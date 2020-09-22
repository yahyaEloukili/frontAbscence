import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from "./login/login.component";
import { ListAdminComponent } from './list-admin/list-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AministrateursComponent } from './administrateurs/administrateurs.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { ProfsComponent } from './profs/profs.component';
import { CreateUserComponent } from "./create-user/create-user.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { RouteGuardService } from "./services/router-guard.service";
import { SceancesComponent } from './sceances/sceances.component';
import { RouterGuardProfService } from "./services/router-guard-prof.service";
import { AddModuleComponent } from './add-module/add-module.component';
import { ModulesComponent } from './modules/modules.component';
import { UpdateModuleComponent } from './update-module/update-module.component';

const routes: Routes = [
  { component: LoginComponent, path: "login" },
  { component: NavbarComponent, path: "admin" },
  { component: AministrateursComponent, path: "administrateurs", canActivate: [RouteGuardService] },
  { component: EtudiantsComponent, path: "etudiants", canActivate: [RouteGuardService] },
  { component: ProfsComponent, path: "profs", canActivate: [RouteGuardService] },
  { component: CreateUserComponent, path: "ajoutUtilisateur", canActivate: [RouteGuardService] },
  { component: UpdateUserComponent, path: "updtaeUtilisateur/:id", canActivate: [RouteGuardService] },
  { component: UpdateModuleComponent, path: "updtaeModule/:id", canActivate: [RouteGuardService] },
  { component: SceancesComponent, path: "sceances", canActivate: [RouterGuardProfService] },
  { component: ModulesComponent, path: "modules", canActivate: [RouteGuardService] },
  { component: AddModuleComponent, path: "addModule", canActivate: [RouteGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
