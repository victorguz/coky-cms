import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FieldMapper } from '../core/model';
import { ConfigService as conf } from './config.config';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {

  constructor(private appTitle: Title) { }

  public setTitle(c_title: string) {
    this.appTitle.setTitle(conf.app_name + ' - ' + c_title);
  }
  /**
   * Generate the type route
   * @param type {string} client or admin
   * @param route end of the route
   */
  public static generateRoute(type: string, route: string) {
    let pre = "";
    switch (type) {
      case "admin": pre = conf.adminRoute; break;
      case "client": pre = conf.clientRoute; break;
    }
    if (route && route.substring(0, 1) != "/" && pre != "") {
      route = "/" + route;
    }
    console.log(pre + route)
    return pre + route;
  }

  public static capitalize(cad: string, split: string = " ") {
    let arr = cad.split(split);
    cad = "";
    arr.forEach(e => {
      cad += e[0].toUpperCase() + e.substring(1);
    });
    return cad;
  }


}
