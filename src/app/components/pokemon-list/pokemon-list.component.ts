import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonDataProvider } from '../../services/pokemon.data-provider.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private pokemons_total: Pokemon[] = [];
  // public by default is useless
  pokemons_filtered: Pokemon[] = [];
  weight: number;
  showDialog: boolean;
  hiddenSpinne: boolean;

  constructor(
    private readonly pokemonApiService: PokemonApiService,
    private readonly selectedPokemonStorage: PokemonDataProvider
  ) { }

  ngOnInit() {
    this.subscription = this.pokemonApiService.getPokemons().subscribe(async (pokemons) => {
      try {
        this.hiddenSpinne = false;
        // Don't need to use forkjoin, it useless here
        const results = await Promise.all(pokemons.map(pokemon => this.pokemonApiService.getPokemonItem(pokemon.name).toPromise()));
        this.pokemons_total = [...results];
        this.pokemons_filtered = results;
      } catch (error) {
        // error handler
        console.log(`An error occured while getting data from the server ${error.message}`);
      } finally {
        // hide loader anyway
        this.hiddenSpinne = true;
      }
    });
  }

  // You should always unsubscribe after on destroy
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public filterPokemons(value: number) {
    const filtered = Number.isNaN(value) ?  this.pokemons_total : this.pokemons_total.filter(pokemon => pokemon.weight <= value);
    this.pokemons_filtered = filtered.sort((a, b) => b.base_experience - a.base_experience);
  }

  public openPopup(pokemon: Pokemon) {
    this.showDialog = true;
    this.selectedPokemonStorage.setData(pokemon);
  }

  // What is this?
  // public onClose(bool) {
  //   console.log(bool);
  //   this.showDialog = false;
  // }

  public onClose() {
    this.showDialog = false;
  }
}
