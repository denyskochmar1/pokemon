import { Injectable } from '@angular/core';
import { ApiHttp } from './api.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { Pokemon } from '../models/pokemon.model';

@Injectable()
export class PokemonApiService {
  private readonly mainApiRoute = 'pokemon';

  constructor(private readonly apiHttp: ApiHttp) { }

  getPokemons() {
    return this.apiHttp.get(this.mainApiRoute)
      .map((res) => res.json().results as Pokemon[]);
  }

  getPokemonItem(pokemonName: string) {
    return this.apiHttp.get(`${this.mainApiRoute}/${pokemonName}`)
      .map((res) => res.json() as Pokemon);
  }
}
