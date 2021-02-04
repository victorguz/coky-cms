import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';
import { Checks } from 'src/app/core/checks';
import { UserI } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {

  public user: UserI = {
    id: null,
    first_name: "",
    second_name: "",
    first_lastname: "",
    second_lastname: "",
    username: "",
    password: "",
    email: "",
    data: "",
    role: 1,
    status: 1,
    created: null,
    modified: null,
  };

  rePassword = ""
  alert: string = "";

  images = [
    'assets/built-in/images/pensioners.jpg',
    'https://www.workflexibility.org/wp-content/uploads/How-Work-Flexibility-for-Parents-Can-Be-Life-Changing-.jpg',
    'https://www.theladders.com/wp-content/uploads/parents-baby-191101.jpg',
  ]
  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {

  }

  async register() {
    // console.log(this.user)
    if (this.check()) {
      try {
        let result: any = await this.usersService.create(this.user);
        if (result.success) {
          console.log(result)
          // this.router.navigate([FunctionsService.generateRoute("admin", "")]);
        } else {
          this.alert = result.message;
        }
      } catch (result) {

        console.log(result.error.message)
      }
    }
  }

  check() {
    if (this.user.first_name == "") {
      this.alert = "Digite su primer nombre";
      return false;
    }
    if (this.user.first_lastname == "") {
      this.alert = "Digite su primer apellido";
      return false;
    }
    if (this.user.email == "") {
      this.alert = "Digite su correo electrónico";
      return false;
    } else {
      const isEmail = Checks.isEmail(this.user.email);
      console.log(this.user.email, isEmail)
      if (!isEmail) {
        this.alert = "Digite un correo electrónico válido";
        return false;
      }
    }
    if (this.user.username == "") {
      this.alert = "Digite un nombre de usuario";
      return false;
    }
    if (this.user.password == "") {
      this.alert = "Digite una contraseña";
      return false;
    }
    if (this.rePassword == "") {
      this.alert = "Repita la contraseña";
      return false;
    }
    if (this.rePassword != this.user.password) {
      this.alert = "Las contraseñas no coinciden";
      return false;
    }
    this.alert = "";
    return true;
  }

  go(type: string, url: string) {
    this.router.navigate([FunctionsService.generateRoute(type, url)]);
  }
}
