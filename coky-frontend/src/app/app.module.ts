import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/panel/layout/navbar/navbar.component';
import { FooterComponent } from './components/panel/layout/footer/footer.component';
import { LeftbarComponent } from './components/panel/layout/leftbar/leftbar.component';
import { LoginComponent } from './components/panel/views/login/login.component';
import { ConfigurationComponent } from './components/panel/views/configuration/configuration.component';
import { DatabasesComponent } from './components/panel/views/databases/databases.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LeftbarComponent,
    LoginComponent,
    ConfigurationComponent,
    DatabasesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
