
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Pokemon } from '../../models/pokemon.model';
import { Subscription } from 'rxjs/Subscription';
import { PokemonDataProvider } from '../../services/pokemon.data-provider.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  selectedPokemon: Pokemon;
  @Output() onClose = new EventEmitter<boolean>();

  constructor(
    private readonly pokemonApiService: PokemonApiService,
    private readonly selectedPokemonStorage: PokemonDataProvider
  ) { }

  ngOnInit() {
    this.subscription = this.selectedPokemonStorage
      .getData()
      .subscribe((pokemon: Pokemon) => {
        this.selectedPokemon = pokemon;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closePop(bool) {
    this.onClose.emit(bool);
  }
}
