import { TestBed, inject } from '@angular/core/testing';

import { EasterEggService } from './easter-egg.service';

describe('EasterEggService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EasterEggService]
    });
  });

  it('should be created', inject([EasterEggService], (service: EasterEggService) => {
    expect(service).toBeTruthy();
  }));
});
