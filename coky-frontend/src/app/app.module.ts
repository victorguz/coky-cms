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
import { UsersService } from './services/users.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { PublicPricesComponent } from './view/public/public-prices/public-prices.component';
import { PublicContactComponent } from './view/public/public-contact/public-contact.component';


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
    PublicPricesComponent,
    PublicContactComponent,
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
    //Others
  ],
  exports: [],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
