import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigRoutingModule } from './config/routing.config';


//material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './view/app.component';
import { UsersComponent } from './view/admin/users/admin/users.component';
import { UsersService } from './services/users.service';
import { HomeComponent } from './view/admin/home/home.component';
import { NotFoundComponent } from './view/admin/not-found/not-found.component';
import { NavbarComponent } from './view/admin/layout/navbar/navbar.component';
import { SidebarComponent } from './view/admin/layout/sidebar/sidebar.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './view/admin/layout/footer/footer.component';
import { LoginComponent } from './view/admin/users/login/login.component';
import { RegisterComponent } from './view/admin/users/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    //material
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  exports: [],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
