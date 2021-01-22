import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';
import { UserI } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserI = {};
  rePassword = ""
  alert: string = "";
  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {
  }

  async register() {
    if (this.check()) {
      try {
        let result: any = await this.usersService.create(this.user);
        if (result.success) {
          alert("Creado")
          this.router.navigate([FunctionsService.generateRoute("admin", "")]);
        } else {
          this.alert = result.message;
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  check() {
    if (this.user.username == "") {
      this.alert = "Digite un nombre de usuario";
      return false;
    }
    if (this.user.password == "") {
      this.alert = "Digite una contraseña";
      return false;
    }
    this.alert = "";
    return true;
  }

  go(type: string, url: string) {
    this.router.navigate([FunctionsService.generateRoute(type, url)]);
  }
}
