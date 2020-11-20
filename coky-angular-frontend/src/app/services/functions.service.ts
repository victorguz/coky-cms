import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private appTitle: Title) {}

  public setComponentTitle(c_title: string) {
    this.appTitle.setTitle(ConfigService.app_name + ' - ' + c_title);
  }

  public static getRoute(appOrPanel: string, route: string) {
    return ConfigService.adminRoute
      ? ConfigService.adminRoute + (route?'/' + route:"")
      : route;
  }
}
