import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from '../view/admin/admin-home/admin-home.component';
import { AdminNotFoundComponent } from '../view/admin/admin-not-found/admin-not-found.component';
import { AdminLoginComponent } from '../view/admin/users/admin-login/admin-login.component';
import { AdminRegisterComponent } from '../view/admin/users/admin-register/admin-register.component';
import { AdminUsersComponent } from '../view/admin/users/admin-users/admin-users.component';
import { PublicAboutComponent } from '../view/public/public-about/public-about.component';
import { PublicContactComponent } from '../view/public/public-contact/public-contact.component';
import { PublicHomeComponent } from '../view/public/public-home/public-home.component';
import { PublicPlansComponent } from '../view/public/public-plans/public-plans.component';
import { PublicServicesComponent } from '../view/public/public-services/public-services.component';
import { ConfigService } from './config.config';

const routes: Routes = [
  /**
   * Admin Routes
   */
  //Home
  {
    path: ConfigService.adminRoute + "", component: AdminHomeComponent,
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
    path: ConfigService.adminRoute + '/users', component: AdminUsersComponent,
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
    path: ConfigService.adminRoute + '/users/details/:id', component: AdminUsersComponent,
    data: {
      roles: ["admin"],
      title: "User details"
    }
  },
  {
    path: 'users/login', component: AdminLoginComponent,
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
  {
    path: '', component: PublicHomeComponent,
    data: {
      roles: ["all"],
      title: "home",
    }
  },
  {
    path: 'services', component: PublicServicesComponent,
    data: {
      roles: ["all"],
      title: "services",
    }
  },
  {
    path: 'plans', component: PublicPlansComponent,
    data: {
      roles: ["all"],
      title: "plans",
    }
  },
  {
    path: 'about', component: PublicAboutComponent,
    data: {
      roles: ["all"],
      title: "about",
    }
  },
  {
    path: 'contact', component: PublicContactComponent,
    data: {
      roles: ["all"],
      title: "contact",
    }
  },
  {
    path: 'quote/:type', component: PublicContactComponent,
    data: {
      roles: ["all"],
      title: "quote",
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
