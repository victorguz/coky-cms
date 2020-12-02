import { Component, NgModule, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FunctionsService } from 'src/app/config/functions.config';
import { User, UserI } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  entity: User = new User;
  users: UserI[] = []
  selectedUser: UserI;
  selectedLength: number = 50;
  dtOptions: DataTables.Settings = {};

  constructor(private usersService: UsersService) {
    this.selectedUser = {
      id: 0,
      first_name: "",
      second_name: "",
      first_lastname: "",
      second_lastname: "",
      username: "",
      password: "",
      email: "",
      data: null,
      role: 0,
      status: 0,
      created: new Date,
      modified: new Date,
    }
  }

  async ngOnInit() {
    this.loadAll()
  }

  async loadAll() {
    this.users = await this.usersService.all(this.selectedLength, 0);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [0, 5, 10, 20, 50, 100],
      order: [0, "asc"]
    };
    // let table = null;
    // table = $('.table').DataTable();
    // table.ajax.reload()
    console.log(this.users)
  }

  columns = [
    // 'Id',
    'Item',
    'Nombre',
    'Username',
    'Email',
    'Role',
    'Status',
    'Actions',
  ]

  showDetails(user: UserI) {
    this.selectedUser = user;
    console.log(this.selectedUser)
  }
  fieldsAllowed(field) {
    return !(field.includes('id') || field.includes('created') || field.includes('modified'))
  }

}
