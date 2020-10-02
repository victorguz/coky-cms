import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/panel/views/home/home.component';
import { LoginComponent } from './components/panel/views/login/login.component';

/**
 * Panel routes
 * All the routes starts with 'panel/'
 */
const panelRoutes: Routes = [
  { path: "panel", component: HomeComponent },
  { path: "panel/login", component: LoginComponent },
];

/**
 * App routes
 * All the routes starts with '/'
 */
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
];


/**
 * All routes to export
 */
let routes: Routes=[];

/**
 * Add the App Routes to main
 */
appRoutes.forEach(route => {
  routes.push(route);
});

/**
 * Add the Panel Routes to main
 */
panelRoutes.forEach(route => {
  routes.push(route);
});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
