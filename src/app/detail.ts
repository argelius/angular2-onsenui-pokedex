import {Component} from '@angular/core';
import {OnsNavigator, Params} from 'angular2-onsenui';

import {PokedexService} from './pokedex.service';
import {CaughtPokemonService} from './caught-pokemon.service';

import {Pokemon} from './pokemon';
import {PokemonDetails} from './pokemon-details';

@Component({
  selector: 'ons-page[page]',
  template: require('./detail.html'),
  styles: [require('./detail.css')]
})
export class DetailPage {
  pokemon: Pokemon;
  details: PokemonDetails;
  loaded: boolean = false;

  constructor(
    private navi: OnsNavigator,
    private params: Params,
    private pokedexService: PokedexService,
    private caughtPokemon: CaughtPokemonService
  ) {
    /**
     * Get the Pokemon that was pushed.
     */
    let tmp: any = params.data;
    this.pokemon = tmp.pokemon;
  }

  onChange(e, pokemon) {
    if (e.target.checked) {
      this.caughtPokemon.add(pokemon.id);
    } else {
      this.caughtPokemon.remove(pokemon.id);
    }
  }

  ngOnInit() {
    this.pokedexService.getPokemonDetails(this.pokemon.id)
      .then(details => {
        this.loaded = true;
        this.details = details;
      });
  }
}


