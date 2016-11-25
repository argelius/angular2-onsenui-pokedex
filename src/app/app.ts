import {Component, ViewChild} from '@angular/core';

import {MasterPage} from './master';

@Component({
  selector: 'app',
  template: require('./app.html'),
  styles: [require('./app.css')]
})
export class MyApp {
  page = MasterPage;
}
