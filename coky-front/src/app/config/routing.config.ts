import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../view/core/home/home.component';
import { NotFoundComponent } from '../view/core/not-found/not-found.component';
import { UsersComponent } from '../view/core/users/users.component';
import { FunctionsService as func } from './functions.config';

const routes: Routes = [
  /**
   * Admin Routes
   */
  //Home
  {
    path: func.generateRoute('admin', '/'), component: HomeComponent,
    data: {
      roles: ["all"],
      title: "home",
      sidebar: {
        icon: "home",
        position: 1,
      }
    }
  },
  //Users
  {
    path: func.generateRoute('admin', '/users'), component: UsersComponent,
    data: {
      roles: ["all"],
      title: "Users",
      sidebar: {
        icon: "people",
        position: 2,
      }
    }
  },
  {
    path: func.generateRoute('admin', '/users/details/:id'), component: UsersComponent,
    data: {
      roles: ["admin"],
      title: "User details"
    }
  },
  //Default
  {
    path: '**', component: NotFoundComponent,
    data: {
      roles: ["all"],
      title: "404"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
