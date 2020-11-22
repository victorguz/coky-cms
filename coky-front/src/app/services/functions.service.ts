import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigService as conf } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private appTitle: Title) { }

  public setComponentTitle(c_title: string) {
    this.appTitle.setTitle(conf.app_name + ' - ' + c_title);
  }

  public static getRoute(type: string, route: string) {
    let pre = "";
    switch (type) {
      case "admin": pre = conf.adminRoute;
    }
    if (route && route.substring(0, 1) != "/" && pre != "") {
      route = "/" + route;
    }
    console.log(conf.adminRoute + route)
    return pre;
  }

  public static getAdminRoute(route: string) {
    this.getRoute("admin", route)
  }

  public static getClientRoute(route: string) {
    this.getRoute("client", route)
  }
}
