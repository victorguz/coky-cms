import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private appTitle: Title) {}

  public setComponentTitle(c_title: string) {
    this.appTitle.setTitle(environment.app_name + ' - ' + c_title);
  }

  public static getRoute(appOrPanel: string, route: string) {
    if (appOrPanel == 'panel') {
      console.log(ConfigService.panelRoute ? ConfigService.panelRoute + '/' + route: route)
      return ConfigService.panelRoute ? ConfigService.panelRoute + '/' + route: route;
    }
    if (appOrPanel == 'app') {
      console.log(ConfigService.appRoute ? ConfigService.appRoute + '/' + route: route)
    return ConfigService.appRoute? ConfigService.appRoute + '/' + route: route;
    }
  }
}
