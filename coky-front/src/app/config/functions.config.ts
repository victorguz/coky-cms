import { Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfigService as conf } from './config.config';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {


  constructor(private appTitle: Title,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  public setTitle(c_title: string) {
    this.appTitle.setTitle(FunctionsService.capitalize(c_title) + ' - ' + conf.app_name);
  }


  /**
   * Generate the type route
   * @param type {string} client or admin
   * @param route end of the route
   */
  public static generateRoute(type: string, route: string = "") {
    let pre = "";
    switch (type) {
      case "admin": pre = conf.adminRoute; break;
      case "client": pre = conf.clientRoute; break;
    }
    if (route && route.substring(0, 1) != "/" && pre != "") {
      route = "/" + route;
    }
    return pre + route;
  }
  /**
   * Pone en mayusculas la inicial de cada palabra y en minusculas el resto de las letras en una cadena.
   * @param cad 
   * @param split 
   */
  public static capitalize(cad: string, split: string = " ") {
    let arr = cad.toLocaleLowerCase().split(split);
    cad = "";
    arr.forEach(e => {
      cad += e[0].toUpperCase() + e.substring(1) + " ";
    });
    return cad;
  }

  /**
   * 
   * @param lista 
   * @param by 
   */
  public static orderList(lista: any[], by: string) {
    return lista.sort(function (a, b) {
      if (typeof a[by] == "string" && typeof b[by] == "string") {
        a[by] = a[by].toLocaleLowerCase()
      }
      if (a[by] > b[by]) {
        return 1;
      }
      if (a[by] < b[by]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
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

  public static pushItemsToArray(array, items): any[] {
    items.forEach(item => {
      array.push(item)
    });
    return array;
  }

  public showMessage(message: string, action: string, type = "danger", time = 2000, func = null) {
    let classs = ""
    switch (type) {

      case "primary":
        classs = "primarySnackbar"
        break;
      case "secondary":
        classs = "secondarySnackbar"
        break;
      case "gray":
        classs = "graySnackbar"
        break;
      case "dark":
        classs = "darkSnackbar"
        break;
      case "success":
        classs = "successSnackbar"
        break;
      case "alert":
        classs = "alertSnackbar"
        break;
      case "white":
        classs = "whiteSnackbar"
        break;
      case "danger":
        classs = "dangerSnackbar"
        break;
      case "info":
        classs = "infoSnackbar"
        break;
    }
    const snackBarRef = this._snackBar.open(message, action, {
      duration: time,
      horizontalPosition: "end",
      verticalPosition: "bottom",
      panelClass: classs
    });

    if (func != null) {
      snackBarRef.onAction().subscribe(func)
    }
  }
}
