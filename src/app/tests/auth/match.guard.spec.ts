import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  convertToParamMap
} from '@angular/router';

import { matchGuard } from '../../auth/match.guard';
import { MatchService } from '../../services/match.service';
import { AuthService } from '../../auth/auth.service';

describe('matchGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => matchGuard(...guardParameters));

  const mockRoute = { params: { id: 100 }, paramMap: convertToParamMap({ id: '123456789012' }) } as unknown as ActivatedRouteSnapshot;
  const mockActivatedRoute = { snapshot: { url: [{ path: 'matches' }], paramMap: convertToParamMap({ id: '123456789012' }) } }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ActivatedRouteSnapshot, useValue: mockRoute },
        { provide: RouterStateSnapshot, useValue: { url: 'matches' } },
        { provide: MatchService, useValue: {} },
        { provide: AuthService, useValue: {} },
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  // it('should not activate', () => {
  //   const result = executeGuard(mockRoute, {} as any);
  //   console.log(result, "should not activate");
  //   expect(result).toEqual(Promise.resolve(false));
  // });
});
