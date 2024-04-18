import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { authGuard } from '../../auth/auth.guard';
import { AuthService } from '../../auth/auth.service';
import { runInInjectionContext } from '@angular/core';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  const mockRoute = { params: { id: 100 } } as unknown as ActivatedRouteSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { USER_ID: '' } },
        { provide: ActivatedRoute, useValue: { snapshot: { url: [{ path: 'matches' }] } } },
        { provide: ActivatedRouteSnapshot, useValue: mockRoute },
        { provide: RouterStateSnapshot, useValue: { url: 'matches' } },
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  // it('should not activate', () => {
  //   const authService = TestBed.inject(AuthService);
  //   const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, {} as any));
  //   expect(result).toBeFalsy();
  // });
  
  // it('should activate', () => {
  //   const authService = TestBed.inject(AuthService);
  //   Object.defineProperty(authService, 'USER_ID', { value: 'test' });
  //   const result = executeGuard(mockRoute,{} as RouterStateSnapshot); // Pass any necessary parameters here
  //   expect(result).toBeTruthy();
  // });
});
