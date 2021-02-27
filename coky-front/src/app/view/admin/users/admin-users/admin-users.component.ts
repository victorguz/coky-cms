import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService as func } from 'src/app/config/functions.config';
import { UsersConfigModule } from 'src/app/config/users.config';
import { UserI } from 'src/app/models/users.model';
import { User } from "src/app/models/users.model";
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

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
        return `${func.capitalize(UsersConfigModule.getRoleName(full.role))}`;
      }
    },
    {
      title: 'Status',
      render: function (data: any, type: any, full: any, index: number) {
        return `${func.capitalize(UsersConfigModule.getStatusName(full.status))}`;
      }
    },
    // { title: 'Actions', data: "" },
  ]

  //Users
  entity: User = new User;
  users: UserI[] = [];
  detailsUser: UserI;
  editUser: UserI;
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
      let result = await this.usersService.orderby("id", "desc", 50, 0);
      this.users = result.result;
    } catch (error) {
      console.log(error)
    }
  }
  async setUser() {
    try {
      this.detailsUser = await this.usersService.getOne(this.id);
      this.editUser = this.detailsUser;
      console.log(this.editUser)
    } catch (error) {
      console.log(error)
    }
  }

  get(type, value): string {
    switch (type) {
      case "role": return UsersConfigModule.getRoleName(value);
      case "status": return UsersConfigModule.getStatusName(value);
    }
  }


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChildren(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];