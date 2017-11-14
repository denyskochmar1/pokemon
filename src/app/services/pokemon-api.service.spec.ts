import { TestBed, inject } from '@angular/core/testing';

import { PokemonApiService } from './pokemon-api.service';

describe('PokemonApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonApiService]
    });
  });

  it('should be created', inject([PokemonApiService], (service: PokemonApiService) => {
    expect(service).toBeTruthy();
  }));
});
