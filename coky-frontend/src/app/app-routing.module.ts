import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppHomeComponent } from './components/app/views/app-home/app-home.component';
import { PanelHomeComponent } from './components/panel/views/panel-home/panel-home.component';
import { PanelLoginComponent } from './components/panel/views/panel-login/panel-login.component';
import { FunctionsService } from './services/functions.service';


/**
 * Panel routes
 * All the routes starts with 'panel/'
 */
const panelRoutes: Routes = [
  { path: FunctionsService.getRoute("panel","home"), component: PanelHomeComponent ,data:{title:"Inicio Panel"}},
  { path: FunctionsService.getRoute("panel",""), component: PanelLoginComponent,data:{title:"Login Panel"} },
];

/**
 * App routes
 * All the routes starts with '/'
 */
const appRoutes: Routes = [
  { path: FunctionsService.getRoute("app","home"), component: AppHomeComponent, data: { title: 'Inicio' } },
];

/**
 * All routes to export
 */
let routes: Routes = [
];

/**
 * Add the App Routes to main
 */
appRoutes.forEach((route) => {
  routes.push(route);
});

/**
 * Add the Panel Routes to main
 */
panelRoutes.forEach((route) => {
  routes.push(route);
});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
