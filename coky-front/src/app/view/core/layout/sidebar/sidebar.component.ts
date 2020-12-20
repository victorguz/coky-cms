import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  tipeOfIcons = "outline"

  routes: SidebarRoute[] = []

  constructor(private router: Router) {
    this.setRoutes();
  }


  private addRoutes() {
    this.routes.push({ route: "/admin/users/login", title: "login", icon: "log-in", position: 3 })
    this.routes.push({ route: "/admin/users/new", title: "registrarse", icon: "person-add", position: 4 })
    this.routes.push({ route: "/admin/users/end", title: "cerrar sesión", icon: "log-out", position: 5 })
  }


  private setRoutes() {
    this.router.config.forEach(element => {
      try {
        if (element.data && element.data.sidebar ) {
          this.routes.push({
            route: element.path,
            title: element.data.title ? element.data.title : element.path,
            icon: element.data.sidebar.icon ? element.data.sidebar.icon : "browsers",
            position: element.data.sidebar.position ? element.data.sidebar.position : 1000
          })
        }
      } catch (error) {
        console.log(error)
      }
    });
    this.addRoutes()
    this.routes = FunctionsService.orderJsonList(this.routes, "position")
  }
}
interface SidebarRoute {
  route: string
  title: string
  icon: string
  position: number
}
