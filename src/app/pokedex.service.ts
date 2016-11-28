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
    let details;

    return this.http.get(`${this.baseUrl}${id}/`)
      .toPromise()
      .then(response => response.json())
      .then(details => {
        const types = details.types
          .map(t => {
            return t.type.name
          });

        details = {
          id: details.id,
          name: details.name,
          weight: details.weight,
          height: details.height,
          types
        };

        /**
         * We need to make another call
         * to get the description text.
         */
        return this.http
          .get(details.species.url)
          .toPromise();
      })
      .then(response => response.json())
      .then(species => {
        console.log(species);
        return details;
      });
  }
}
