import { NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicModule, Config } from 'ionic-angular';

import { Logger } from './logger.service';

@NgModule({
	imports: [IonicModule],
	providers: [ Logger ]
})
export class IonicLoggerModule {}
