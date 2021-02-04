import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from '../view/admin/admin-home/admin-home.component';
import { AdminNotFoundComponent } from '../view/admin/admin-not-found/admin-not-found.component';
import { AdminLoginComponent } from '../view/admin/users/admin-login/admin-login.component';
import { AdminRegisterComponent } from '../view/admin/users/admin-register/admin-register.component';
import { AdminUsersComponent } from '../view/admin/users/admin-users/admin-users.component';
import { PublicHomeComponent } from '../view/public/public-home/public-home.component';
import { FunctionsService as func } from './functions.config';

const routes: Routes = [
  /**
   * Admin Routes
   */
  //Home
  {
    path: "admin", component: AdminHomeComponent,
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
    path: 'admin/users', component: AdminUsersComponent,
    data: {
      roles: ["all"],
      title: "Users",
      sidebar: {
        icon: "people",
        position: 2,
      }
    },
  },
  {
    path: 'admin/users/details/:id', component: AdminUsersComponent,
    data: {
      roles: ["admin"],
      title: "User details"
    }
  },
  {
    path: 'admin/users/login', component: AdminLoginComponent,
    data: {
      roles: ["all"],
      title: "Login",
    },
  },
  {
    path: 'admin/users/register', component: AdminRegisterComponent,
    data: {
      roles: ["all"],
      title: "Registrarse",
    },
  },




  /**
     * Public Routes
     */
  //Home
  {
    path: '', component: PublicHomeComponent,
    data: {
      roles: ["all"],
      title: "home",
      sidebar: {
        icon: "home",
        position: 1,
      }
    }
  },





  //dev

  //Default
  {
    path: '**', component: AdminNotFoundComponent,
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
