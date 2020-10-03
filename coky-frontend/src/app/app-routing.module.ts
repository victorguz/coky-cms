import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminConfigComponent } from './components/view/admin-config/admin-config.component';
import { AdminDatabasesComponent } from './components/view/admin-databases/admin-databases.component';
import { AdminHomeComponent } from './components/view/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/view/admin-login/admin-login.component';
import { AdminTablesComponent } from './components/view/admin-tables/admin-tables.component';
import { FunctionsService } from './services/functions.service';

/**
 * Admin routes
 * All the routes starts with 'admin/'
 */
const ADMIN_ROUTES: Routes = [
  { path: FunctionsService.getRoute('admin', 'home'), component: AdminHomeComponent,data: { title: 'Inicio' },},
  {
    path: FunctionsService.getRoute('admin', ''),
    component: AdminLoginComponent,
    data: { title: 'Login' },
  },
  { path: FunctionsService.getRoute('admin', 'config'), component: AdminConfigComponent,data: { title: 'Configuración' },},
  { path: FunctionsService.getRoute('admin', 'tables'), component: AdminTablesComponent,data: { title: 'Tablas o Módulos' },},
  { path: FunctionsService.getRoute('admin', 'databases'), component: AdminDatabasesComponent,data: { title: 'Bases de datos' },},

];

let routes: Routes = [
];

ADMIN_ROUTES.forEach(route => {
  routes.push(route);
});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
