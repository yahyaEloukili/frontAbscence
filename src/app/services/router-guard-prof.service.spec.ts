import { TestBed } from '@angular/core/testing';

import { RouterGuardProfService } from './router-guard-prof.service';

describe('RouterGuardProfService', () => {
  let service: RouterGuardProfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterGuardProfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
