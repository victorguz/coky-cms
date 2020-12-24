import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigRoutingModule } from './config/routing.config';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './view/app.component';
import { UsersComponent } from './view/core/users/admin/users.component';
import { UsersService } from './services/users.service';
import { DatatableComponent } from './view/core/imports/datatable/datatable.component';
import { HomeComponent } from './view/core/home/home.component';
import { NotFoundComponent } from './view/core/not-found/not-found.component';
import { NavbarComponent } from './view/core/layout/navbar/navbar.component';
import { SidebarComponent } from './view/core/layout/sidebar/sidebar.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DatatableComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigRoutingModule,
    DataTablesModule,
    HttpClientModule,
    IonicModule.forRoot(),
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
