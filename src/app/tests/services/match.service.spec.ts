import { TestBed } from '@angular/core/testing';

import { MatchService } from '../../services/match.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('MatchService', () => {
  let service: MatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
