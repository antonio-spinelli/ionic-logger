# Ionic Logger

[![NPM](https://nodei.co/npm/ionic-logger.png?downloads=true)](https://nodei.co/npm/ionic-logger/)

Ionic 4 plugin providing a logger service.

## Installation

For Ionic v2/3 use [v0.4.1](https://github.com/antonio-spinelli/ionic-logger/tree/0.4.1)

Make sure you have Ionic and Angular installed.

```
npm install --save ionic-logger
```

**Check you peer-dependencies warnings after `npm install` to make sure you are using a version in accordance to your Ionic version.**

### Import

```typescript
import { IonicLoggerModule, Logger } from 'ionic-logger';

@NgModule({
  imports: [
    IonicLoggerModule.forRoot({
      docDir: 'MyApp',
      logDir: 'log'
    })
  ],
  providers: [
    Logger
  ]
})
export class AppModule {}
```

## Config

| Options               | Type     | Description  |
| ---------------       |:---------| :------------|
| docDir          | string   | Document directory. Defaults to 'ionic-logger' |
| logDir          | string   | Log directory inside docDir. Defaults to 'log' |
| logDayFormat          | string   | Day format. Defaults to 'YYYY-MM-DD' |
| logHourFormat          | string   | Hour format. Defaults to 'HH:mm:ss:SSS' |
| debug | boolean  | Boolean to enable debug mode. Defaults to false |

## Example

- app.component.ts

```typescript
import { Platform } from 'ionic-angular';
import { Logger } from 'ionic-logger';
import { FileSystemService } from './file-system.service'; // your own service or model that implements ionic-logger FileSystem interface

...

constructor(
  private logger: Logger,
  private platform: Platform
) {
  this.platform.ready().then(() => {

    ...

    this.logger.init(fileSystemService).then((status) => {
      this.logger.debug('[Logger] init: ' + status);
    })
  }
}
```