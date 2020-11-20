import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminNavbarComponent } from './components/layout/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './components/layout/admin-footer/admin-footer.component';
import { AdminHomeComponent } from './components/view/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/view/admin-login/admin-login.component';
import { AdminSidebarComponent } from './components/layout/admin-sidebar/admin-sidebar.component';
import { AdminConfigComponent } from './components/view/admin-config/admin-config.component';
import { AdminTablesComponent } from './components/view/admin-tables/admin-tables.component';
import { AdminDatabasesComponent } from './components/view/admin-databases/admin-databases.component';
import { FormsModule } from '@angular/forms';

/**
 * Use ng new c components/panel/[views][layout]/Panel[ComponentName] to create a component to panel
 * Use ng new c components/app/[views][layout]/App[ComponentName] to create a component to app
 *
 */
@NgModule({
  declarations: [
    AppComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    AdminSidebarComponent,
    AdminConfigComponent,
    AdminTablesComponent,
    AdminDatabasesComponent,
  ],
  imports: [
    //Angular Modules
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //Material
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
