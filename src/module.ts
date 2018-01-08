import { ModuleWithProviders, NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'

import {
  DOC_DIR,
  DEBUG,
  LOG_DAY_FORMAT,
  LOG_DIR,
  LOG_HOUR_FORMAT,
  Logger
} from './logger.service'

@NgModule({
  imports: [IonicModule],
  providers: [ Logger ]
})
export class IonicLoggerModule {
  /**
   * Use this method in your root module
   * @param {IonicLoggerModuleConfig}
   * @returns {ModuleWithProviders}
   */
  static forRoot(config: IonicLoggerModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: IonicLoggerModule,
      providers: [
        { provide: DOC_DIR, useValue: config.docDir || 'ionic-logger' },
        { provide: LOG_DIR, useValue: config.logDir || 'log' },
        { provide: LOG_DAY_FORMAT, useValue: config.logDayFormat || 'YYYY-MM-DD' },
        { provide: LOG_HOUR_FORMAT, useValue: config.logHourFormat || 'HH:mm:ss:SSS' },
        { provide: DEBUG, useValue: !!config.debug },
        Logger
      ]
    }
  }
}

export interface IonicLoggerModuleConfig {
  docDir?: string
  logDir?: string
  logDayFormat?: string
  logHourFormat?: string
  debug?: boolean
}
