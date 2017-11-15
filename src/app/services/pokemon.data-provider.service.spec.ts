import { TestBed, inject } from '@angular/core/testing';
import { PokemonDataProvider } from './pokemon.data-provider.service';


describe('Pokemon.DataProvider.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonDataProvider]
    });
  });

  it('should be created', inject([PokemonDataProvider], (service: PokemonDataProvider) => {
    expect(service).toBeTruthy();
  }));
});
