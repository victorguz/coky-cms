import { ConfigService } from 'src/app/services/config.service';

export const environment = {
  production: true,
  app_name:ConfigService.app_name,
  panelRoute:ConfigService.panelRoute,
  appRoute:ConfigService.appRoute,
};
