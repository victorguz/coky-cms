import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { FunctionsService } from 'src/app/config/functions.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  alert: string = "";
  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {
  }

  async login() {
    if (this.check()) {
      try {
        let result: any = await this.usersService.login(this.username, this.password);
        if (result.success) {
          alert("logueado")
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
    if (this.username == "") {
      this.alert = "Digite un nombre de usuario";
      return false;
    }
    if (this.password == "") {
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
