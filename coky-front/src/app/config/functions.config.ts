import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FieldMapper } from '../core/model';
import { ConfigService as conf } from './config.config';

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

  public static createInput(title: string, placeholder: string = "", type: string = "text", variableName?: string) {
    return `


        <div class="form-group col-6">
          <label>${title}</label>
          <input type="text" class="form-control" placeholder="${placeholder}" ${variableName ? `[(ngModel)]="${variableName}"` : ""}>
        </div>
    `;
  }

  public static createBootstrapForm(mapper: FieldMapper[], variableName) {
    let html = "";
    mapper.forEach(field => {
      let name = field.name.replace("_", " ");
      html += FunctionsService.createInput(name, name, "text", variableName + "." + field.name)
    });
    return html;
  }
}
