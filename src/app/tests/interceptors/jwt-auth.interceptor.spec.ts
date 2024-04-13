import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { Observable } from 'rxjs';
import { jwtAuthInterceptor } from '../../interceptors/jwt-auth.interceptor';

describe('jwtAuthInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => jwtAuthInterceptor(req, next));

  
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

});
