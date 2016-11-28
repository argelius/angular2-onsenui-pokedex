import {Component, OnInit} from '@angular/core';
import {OnsNavigator} from 'angular2-onsenui';

import {PokedexService} from './pokedex.service';
import {Pokemon} from './pokemon';
import {DetailPage} from './detail';

@Component({
  selector: 'ons-page[page]',
  template: require('./master.html'),
  styles: [require('./master.css')]
})
export class MasterPage implements OnInit {
  counter: number;
  pokemon: Pokemon[] = [];
  isLoading: boolean = false;
  error: boolean = false;

  constructor(
    private navi: OnsNavigator,
    private pokedexService: PokedexService
  ) {
  }

  ngOnInit() {
    this.loadMore();
  }

  loadMore() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.pokedexService.getPokemon(this.pokemon.length, 1)
      .then(pokemon => {
        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
  }

  push(pokemon: Pokemon) {
    const data = {
      pokemon
    };

    this.navi.element.pushPage(
      DetailPage,
      {data}
    );
  }
}
