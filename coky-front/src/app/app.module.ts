import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigRoutingModule } from './config/routing.config';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './view/app.component';
import { AdminCarouselBrandComponent } from './view/admin/imports/admin-carousel-brand/admin-carousel-brand.component';
import { AdminUsersComponent } from './view/admin/users/admin-users/admin-users.component';
import { AdminNotFoundComponent } from './view/admin/admin-not-found/admin-not-found.component';
import { AdminNavbarComponent } from './view/admin/layout/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './view/admin/layout/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './view/admin/layout/admin-footer/admin-footer.component';
import { AdminLoginComponent } from './view/admin/users/admin-login/admin-login.component';
import { AdminRegisterComponent } from './view/admin/users/admin-register/admin-register.component';
import { AdminHomeComponent } from './view/admin/admin-home/admin-home.component';
import { PublicHomeComponent } from './view/public/public-home/public-home.component';
import { PublicNavbarComponent } from './view/public/layout/public-navbar/public-navbar.component';
import { PublicFooterComponent } from './view/public/layout/public-footer/public-footer.component';
import { PublicCarouselComponent } from './view/public/import/public-carousel/public-carousel.component';
import { PublicAboutComponent } from './view/public/public-about/public-about.component';
import { PublicServicesComponent } from './view/public/public-services/public-services.component';
import { PublicContactComponent } from './view/public/public-contact/public-contact.component';
import { PublicPlansComponent } from './view/public/public-plans/public-plans.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    AdminUsersComponent,
    AdminHomeComponent,
    AdminNotFoundComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminCarouselBrandComponent,
    PublicHomeComponent,
    PublicNavbarComponent,
    PublicFooterComponent,
    PublicCarouselComponent,
    PublicAboutComponent,
    PublicServicesComponent,
    PublicContactComponent,
    PublicPlansComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigRoutingModule,
    HttpClientModule,
    // IonicModule.forRoot(),
    //material
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    // On server
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
