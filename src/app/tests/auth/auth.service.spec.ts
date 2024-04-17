import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../auth/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout the user', () => {
    spyOn(service, 'logout').and.returnValue(void 0);
    service.logout();
    expect(service.USER_ID).toBe(null);
  });
});
