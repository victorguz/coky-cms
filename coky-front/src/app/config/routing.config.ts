import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../view/admin/home/home.component';
import { CarouselComponent } from '../view/admin/imports/carousel/carousel.component';
import { NotFoundComponent } from '../view/admin/not-found/not-found.component';
import { UsersComponent } from '../view/admin/users/admin/users.component';
import { LoginComponent } from '../view/admin/users/login/login.component';
import { RegisterComponent } from '../view/admin/users/register/register.component';
import { FunctionsService as func } from './functions.config';

const routes: Routes = [
  /**
   * Admin Routes
   */
  //Home
  {
    path: 'admin', component: HomeComponent,
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
    path: 'admin/users', component: UsersComponent,
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
    path: 'admin/users/details/:id', component: UsersComponent,
    data: {
      roles: ["admin"],
      title: "User details"
    }
  },
  {
    path: 'admin/users/login', component: LoginComponent,
    data: {
      roles: ["all"],
      title: "Login",
    },
  },
  {
    path: 'admin/users/register', component: RegisterComponent,
    data: {
      roles: ["all"],
      title: "Registrarse",
    },
  },
  //dev
  {
    path: 'admin/carousel', component: CarouselComponent,
    data: {
      roles: ["all"],
      title: "Registrarse",
    },
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
