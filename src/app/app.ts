import {Component, OnInit, ViewChild} from '@angular/core';

import {OnsNavigator} from 'angular2-onsenui';
import {PokedexService} from './pokedex.service';
import {CaughtPokemonService} from './caught-pokemon.service';
import {Pokemon} from './pokemon';
import {DetailPage} from './detail';

@Component({
  selector: 'app',
  template: require('./app.html'),
  styles: [require('./app.css')]
})
export class MyApp implements OnInit {
  counter: number;
  pokemon: Pokemon[] = [];
  isLoading: boolean = false;
  error: boolean = false;

  @ViewChild('navi')
  private navi;

  constructor(
    private pokedexService: PokedexService,
    private caughtPokemon: CaughtPokemonService
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

    this.pokedexService.getPokemon(this.pokemon.length, 20)
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

    this.navi.nativeElement.pushPage(
      DetailPage,
      {data}
    );
  }
}
