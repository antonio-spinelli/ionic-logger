import { ModuleWithProviders, NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'

import {
  DOC_DIR,
  DEBUG,
  LOG_DAY_FORMAT,
  LOG_DIR,
  LOG_HOUR_FORMAT,
  Logger,
  PRINT_DEBUG_MSG
} from './logger.service'

@NgModule({
  imports: [IonicModule],
  providers: [Logger]
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
        { provide: DEBUG, useValue: !!config.debug },
        { provide: DOC_DIR, useValue: config.docDir || 'ionic-logger' },
        { provide: LOG_DIR, useValue: config.logDir || 'log' },
        { provide: LOG_DAY_FORMAT, useValue: config.logDayFormat || 'YYYY-MM-DD' },
        { provide: LOG_HOUR_FORMAT, useValue: config.logHourFormat || 'HH:mm:ss:SSS' },
        { provide: PRINT_DEBUG_MSG, useValue: !!config.printDebugMessages },
        Logger
      ]
    }
  }
}

export interface IonicLoggerModuleConfig {
  debug?: boolean
  docDir?: string
  logDir?: string
  logDayFormat?: string
  logHourFormat?: string
  printDebugMessages?: boolean
}
