import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PokemonApiService} from "../../services/pokemon-api.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  public mainPokemon;

  constructor(private pokemonApiService: PokemonApiService) { }

  ngOnInit() {
    this.pokemonApiService.mainPokemon.subscribe(pokemon=>{this.mainPokemon = pokemon});
  }
  public closePop(bool){
    this.onClose.emit(bool);
  }
}
