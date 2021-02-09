import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FieldMapper } from '../core/model';
import { ConfigService as conf } from './config.config';
import { Constantes } from './constants.config';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {

  constructor(private appTitle: Title, private router: Router) { }

  public setTitle(c_title: string) {
    this.appTitle.setTitle(FunctionsService.capitalize(c_title) + ' - ' + conf.app_name);
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
    // console.log(pre + route)
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

  public static orderJsonList(lista: any[], by: string) {
    let aux;
    // Algoritmo de burbuja
    for (let k = 1; k < lista.length; k++) {
      for (let i = 0; i < (lista.length - k); i++) {
        if (lista[i][by] > lista[i + 1][by]) {
          aux = lista[i];
          lista[i] = lista[i + 1];
          lista[i + 1] = aux;
        }
      }
    }
    return lista;
  }
}
