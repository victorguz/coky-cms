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
  public static adminRoute= '';
  public static workRoute= 'work';

  /**
   * About Databases
   */
  constructor() {}
}
