import { Injectable } from '@angular/core';
import { ApiHttp } from './api.service';
import { BehaviorSubject} from 'rxjs';

@Injectable()
export class PokemonApiService {

  mainPokemon: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private apiHttp: ApiHttp) { }

  getPokemons(){
    return this.apiHttp.get( 'pokemon' )
        .map( (res) => res.json() );
  }

  getPokemonItem(name){
    return this.apiHttp.get( 'pokemon/'+ name)
        .map( (res) => res.json() );

  }




}
