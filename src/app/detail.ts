import {Component} from '@angular/core';
import {OnsNavigator, Params} from 'angular2-onsenui';

import {Pokemon} from './pokemon';

@Component({
  selector: 'ons-page[page]',
  template: require('./detail.html'),
  styles: [require('./detail.css')]
})
export class DetailPage {
  pokemon: Pokemon;

  constructor(private navi : OnsNavigator, private params: Params) {
    this.pokemon = params.data.pokemon;
  }

  ngOnInit() {
  }
}


