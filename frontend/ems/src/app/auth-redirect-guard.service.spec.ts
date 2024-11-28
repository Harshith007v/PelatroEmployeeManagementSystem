import { TestBed } from '@angular/core/testing';

import { AuthRedirectGuardService } from './auth-redirect-guard.service';

describe('AuthRedirectGuardService', () => {
  let service: AuthRedirectGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRedirectGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
