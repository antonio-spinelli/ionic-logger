import { Inject, Injectable, InjectionToken } from '@angular/core'
import moment from 'moment'

import { FileSystem } from './file-system.interface'

export const DOC_DIR = new InjectionToken('DOC_DIR')
export const LOG_DIR = new InjectionToken('LOG_DIR')
export const LOG_DAY_FORMAT = new InjectionToken('LOG_DAY_FORMAT')
export const LOG_HOUR_FORMAT = new InjectionToken('LOG_HOUR_FORMAT')
export const DEBUG = new InjectionToken('DEBUG')

@Injectable()
export class Logger {
  private _printToFile: boolean = true
  private _initialized: boolean = false
  private _logPath: string = null
  private _data: any = {}
  private _documentsDirectory: string
  private _debug: boolean = true
  private _file: FileSystem = null

  constructor(
    @Inject(DOC_DIR) private DOC_DIR: string,
    @Inject(LOG_DIR) private LOG_DIR: string,
    @Inject(LOG_DAY_FORMAT) private LOG_DAY_FORMAT: string,
    @Inject(LOG_HOUR_FORMAT) private LOG_HOUR_FORMAT: string
  ) {
  }

  public init(file: FileSystem): Promise<boolean> {
    let that = this
    that._file = file
    if (that._file) {
      that._logPath = that._file.documentsDirectory
      return that.checkAndCreateDir(that._logPath, that.DOC_DIR).then(success => {
        if (success) {
          that._logPath = that._logPath + that.DOC_DIR
          return that.checkAndCreateDir(that._logPath, that.LOG_DIR).then(success => {
            if (success) {
              that._logPath = that._logPath + '/' + that.LOG_DIR
            }
            return success
          }).catch(error => {
            return false
          })
        }
        return success
      }).catch(error => {
        return false
      }).then(success => {
        return that.loadData().then(() => {
          let today = this.getToday()
          let data = this.data[today]
          if (data && data.trim().length > 0) {
            this.writeData(today)
          }
          that._initialized = true
          return success
        })
      })
    } else {
      this._printToFile = false
      that.printDebugMessage('[Logger] print to file disabled')
      return Promise.resolve(true)
    }
  }

  public addToLog(type: string, message: string, skipConsoleLog: boolean, consoleLogMethod: any) {
    if (this._printToFile) {
      let today = this.getToday()
      if (!this.data[today]) {
        this.data[today] = ''
      }
      let now = this.getFormattedTimestamp()
      let msg = now + ' - ' + type + ': ' + message + '\r\n'
      this.data[today] = this.data[today] + msg

      if (this._initialized) {
        this.writeData(today)
      }
    }
    if (!skipConsoleLog && consoleLogMethod) {
      consoleLogMethod(message)
    }
  }

  public info(message: string, skipConsoleLog?: boolean) {
    this.addToLog('INFO', message, skipConsoleLog, console.info)
  }

  public warn(message: string, skipConsoleLog?: boolean) {
    this.addToLog('WARN', message, skipConsoleLog, console.warn)
  }

  public debug(message: string, skipConsoleLog?: boolean) {
    this.addToLog('DEBUG', message, skipConsoleLog, console.debug)
  }

  public error(message: string, skipConsoleLog?: boolean) {
    this.addToLog('ERROR', message, skipConsoleLog, console.error)
  }

  private checkAndCreateDir(path: string, directory: string): Promise<boolean> {
    let that = this
    return that._file.checkDir(path, directory).then(success => {
      return true // do nothing
    }).catch(error => {
      return that._file.createDir(path, directory, false).then(success => {
        that.printDebugMessage('[' + directory + ' checkAndCreateDir] success')
        return true
      }).catch(error => {
        that.error('[' + directory + ' checkAndCreateDir] error: ' + JSON.stringify(error))
        return false
      })
    })
  }

  private getToday(): string {
    return moment().format(this.LOG_DAY_FORMAT)
  }

  private getFormattedTimestamp(): string {
    return moment().format(this.LOG_HOUR_FORMAT)
  }

  private get data(): any {
    return this._data
  }

  private loadData(): Promise<void> {
    let that = this
    let today = that.getToday()
    let file = today + '.txt'
    return that._file.readAsText(that._logPath, file).then(res => {
      return res
    }).catch(error => {
      return ''
    }).then(res => {
      that.data[today] = that.data[today] ? res + that.data[today] : res
    })
  }

  private writeData(today: string) {
    this._file.writeFile(this._logPath, today + '.txt', this.data[today], true).then(res => {
      // this.printDebugMessage(res)
    }).catch(error => {
      console.error(error)
    })
  }

  private printDebugMessage(message) {
    this._debug ? this.debug(message) : undefined
  }

}
