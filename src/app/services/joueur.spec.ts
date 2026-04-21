import { TestBed } from '@angular/core/testing';

import { joueur } from './joueur';

describe('Joueur', () => {
  let service: joueur;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(joueur);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
