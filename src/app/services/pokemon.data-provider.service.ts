import { Pokemon } from '../models/pokemon.model';
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class PokemonDataProvider {
  // Encapsulation
  private readonly _currentPokemon: BehaviorSubject<Pokemon> = new BehaviorSubject(null);

  getData() {
    return this._currentPokemon;
  }

  setData(pokemon: Pokemon) {
    this._currentPokemon.next(pokemon);
  }
}
