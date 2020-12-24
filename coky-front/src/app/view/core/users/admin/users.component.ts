import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfigService } from 'src/app/config/config.config';
import { FunctionsService as func } from 'src/app/config/functions.config';
import { UsersConfigModule as usersConfig } from 'src/app/config/users.config';
import { User, UserI } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  //To datatable
  detailsRoute = func.generateRoute('admin', '/users');
  columns = [
    // { title: 'Id', data: "id" },
    {
      title: 'Item',
      render: function (data: any, type: any, full: any, index: number) {
        return index["row"] + 1;
      }
    },
    {
      title: 'Nombre',
      render: function (data: any, type: any, full: any, index: number) {
        return `${full.first_name} ${full.second_name} ${full.first_lastname} ${full.second_lastname} `;
      }
    },
    { title: 'Username', data: "username" },
    { title: 'Email', data: "email" },
    {
      title: 'Role',
      render: function (data: any, type: any, full: any, index: number) {
        return `${func.capitalize(usersConfig.getRoleName(full.role))}`;
      }
    },
    {
      title: 'Status',
      render: function (data: any, type: any, full: any, index: number) {
        return `${func.capitalize(usersConfig.getStatusName(full.status))}`;
      }
    },
    // { title: 'Actions', data: "" },
  ]

  //Users
  entity: User = new User;
  users: UserI[] = [];
  detailsUser: UserI;
  editUser: UserI;
  allLoaded: boolean = false;
  //Route Params:
  method: string = "";
  id: number = 0;

  //User select properties
  constructor(private usersService: UsersService, private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe(result => {
      if (result.id) {
        this.id = result.id;
        this.setUser();
      }
    })
  }

  async ngOnInit() {
    this.loadAll()
  }

  async loadAll() {
    try {
      this.users = await this.usersService.all(50);
      this.allLoaded = true;
    } catch (error) {
      console.log(error)
    }
  }
  async setUser() {
    try {
      this.detailsUser = await this.usersService.getOne(this.id);
      this.editUser = this.detailsUser;
    } catch (error) {
      console.log(error)
    }
  }

  get(type, value): string {
    switch (type) {
      case "role": return usersConfig.getRoleName(value);
      case "status": return usersConfig.getStatusName(value);
    }
  }

}
