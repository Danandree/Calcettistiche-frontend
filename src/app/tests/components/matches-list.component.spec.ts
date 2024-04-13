import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesListComponent } from '../../components/matches-list/matches-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { of, throwError } from 'rxjs';

describe('MatchesListComponent', () => {
  let component: MatchesListComponent;
  let fixture: ComponentFixture<MatchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { url: [{ path: 'matches' }] } } }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should retrieve machines list', () => {
    const route = TestBed.inject(ActivatedRoute);
    const matchService = TestBed.inject(MatchService);
    route.snapshot.url[0].path = "matches";
    spyOn(matchService, 'getMatchesList').and.returnValue(of([]));
    component.ngOnInit();
    expect(component.matchesList?.length).toBe(0);
  });

  it('should throw an error', () => {
    const route = TestBed.inject(ActivatedRoute);
    const matchService = TestBed.inject(MatchService);
    route.snapshot.url[0].path = "matches";
    spyOn(matchService, 'getMatchesList').and.returnValue(throwError(''));
    component.ngOnInit();
    expect(component.matchesList?.length).toBe(undefined);
  })

  it('should enter edit mode', () => {
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.url[0].path = "";
    component.ngOnInit();
    expect(component.title).toBe("Lista partite modificabili");
  });
});
