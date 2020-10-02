import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  /**
   * About App
   */
  public static app_name = 'Coky';
  
  /**
   * About Routes
   */
  public static panelRoute= '';
  public static appRoute= 'app';

  /**
   * About Databases
   */
  constructor() {}
}
