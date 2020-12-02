import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/core/users/users.component';
import { FunctionsService as func } from './config/functions.config';

const routes: Routes = [
  { path: func.getRoute('admin', ''), component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
