import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionsService as func, FunctionsService } from 'src/app/config/functions.config';
import { UsersConfigModule } from 'src/app/config/users.config';
import { User, UserI } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  username = new FormControl;
  password = new FormControl;
  alert = "";

  images = [
    'assets/built-in/images/pensioners.jpg',
    'https://www.workflexibility.org/wp-content/uploads/How-Work-Flexibility-for-Parents-Can-Be-Life-Changing-.jpg',
    'https://www.theladders.com/wp-content/uploads/parents-baby-191101.jpg',
  ]
  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {
  }

  // async login() {
  //   if (this.check()) {
  //     try {
  //       let result: any = await this.usersService.login(this.username, this.password);
  //       if (result.success) {
  //         alert("logueado")
  //         this.router.navigate([FunctionsService.generateRoute("admin", "")]);
  //       } else {
  //         this.alert = result.message;
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

  // check() {
  //   if (this.username == "") {
  //     this.alert = "Digite un nombre de usuario";
  //     return false;
  //   }
  //   if (this.password == "") {
  //     this.alert = "Digite una contraseña";
  //     return false;
  //   }
  //   this.alert = "";
  //   return true;
  // }

  go(type: string, url: string) {
    this.router.navigate([FunctionsService.generateRoute(type, url)]);
  }
}
