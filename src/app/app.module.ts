import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from "./login/login.component";
import { AministrateursComponent } from './administrateurs/administrateurs.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { TokenInterceptorService } from "./services/token-interceptor.service";

import { NavbarComponent } from "./navbar/navbar.component";
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { ProfsComponent } from './profs/profs.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AministrateursComponent,
    ListAdminComponent,
    NavbarComponent,
    EtudiantsComponent,
    ProfsComponent,
    CreateUserComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FormsModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
