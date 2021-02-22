import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  /**
   * About App
   */
  public static app_name = 'MTS Services';

  /**
   * About Routes
   */
  public static adminRoute = 'platform';
  public static clientRoute = 'work';

  /**
   * About Databases
   */
  constructor() { }
}
