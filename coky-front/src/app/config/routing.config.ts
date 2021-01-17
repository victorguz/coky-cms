import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../view/core/home/home.component';
import { CarouselComponent } from '../view/core/imports/carousel/carousel.component';
import { NotFoundComponent } from '../view/core/not-found/not-found.component';
import { UsersComponent } from '../view/core/users/admin/users.component';
import { LoginComponent } from '../view/core/users/login/login.component';
import { RegisterComponent } from '../view/core/users/register/register.component';
import { FunctionsService as func } from './functions.config';

const routes: Routes = [
  /**
   * Admin Routes
   */
  //Home
  {
    path: func.generateRoute('admin', ''), component: HomeComponent,
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
    },
  },
  {
    path: func.generateRoute('admin', '/users/details/:id'), component: UsersComponent,
    data: {
      roles: ["admin"],
      title: "User details"
    }
  },
  {
    path: func.generateRoute('admin', '/users/login'), component: LoginComponent,
    data: {
      roles: ["all"],
      title: "Login",
    },
  },
  {
    path: func.generateRoute('admin', '/users/register'), component: RegisterComponent,
    data: {
      roles: ["all"],
      title: "Registrarse",
    },
  },
  //dev
  {
    path: func.generateRoute('admin', '/carousel'), component: CarouselComponent,
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
