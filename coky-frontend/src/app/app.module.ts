import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelDatabasesComponent } from './components/panel/views/panel-databases/panel-databases.component';
import { PanelConfigurationComponent } from './components/panel/views/panel-configuration/panel-configuration.component';
import { PanelLoginComponent } from './components/panel/views/panel-login/panel-login.component';
import { PanelHomeComponent } from './components/panel/views/panel-home/panel-home.component';
import { PanelNavbarComponent } from './components/panel/layout/panel-navbar/panel-navbar.component';
import { PanelFooterComponent } from './components/panel/layout/panel-footer/panel-footer.component';
import { AppFooterComponent } from './components/app/layout/app-footer/app-footer.component';
import { AppNavbarComponent } from './components/app/layout/app-navbar/app-navbar.component';
import { AppHomeComponent } from './components/app/views/app-home/app-home.component';
import { AppLoginComponent } from './components/app/views/app-login/app-login.component';
import { ConfigService } from './services/config.service';
import { DatabaseService } from './services/database.service';

/**
 * Use ng new c components/panel/[views][layout]/Panel[ComponentName] to create a component to panel
 * Use ng new c components/app/[views][layout]/App[ComponentName] to create a component to app
 *
 */
@NgModule({
  declarations: [
    AppComponent,
    PanelDatabasesComponent,
    PanelConfigurationComponent,
    PanelLoginComponent,
    PanelHomeComponent,
    PanelNavbarComponent,
    PanelFooterComponent,
    AppFooterComponent,
    AppNavbarComponent,
    AppHomeComponent,
    AppLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //Material
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [Title, ConfigService, DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
