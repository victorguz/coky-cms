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
  public static adminRoute = 'admin';
  public static clientRoute = 'work';

  /**
   * About Databases
   */
  constructor() { }
}
