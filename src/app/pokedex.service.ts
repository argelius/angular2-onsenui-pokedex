import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Pokemon} from './pokemon';
import {PokemonDetails} from './pokemon-details';

@Injectable()
export class PokedexService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: Http) { }

  getPokemon(offset: number, limit: number): Promise<Pokemon> {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      .toPromise()
      .then(response => response.json().results)
      .then(items => items.map((item, idx) => {
        const id: number = idx + offset + 1;
        return {
          name: item.name,
          id
        };
      }));
  }

  getPokemonDetails(id: number): Promise<PokemonDetails> {
    return this.http.get(`${this.baseUrl}/${id}/`)
      .toPromise()
      .then(response => response.json().results);
  }
}
