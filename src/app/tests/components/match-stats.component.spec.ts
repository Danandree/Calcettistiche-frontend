import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchStatsComponent } from '../../components/match-stats/match-stats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { UserStatsMock } from '../../mock/userStatsMock';
import { userListMock } from '../../mock/userList';
import { compileNgModule } from '@angular/compiler';
import { MatchService } from '../../services/match.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { matchListMock } from '../../mock/matchList';
import { AuthService } from '../../auth/auth.service';
import { throwError } from 'rxjs';

describe('MatchStatsComponent', () => {
  let component: MatchStatsComponent;
  let fixture: ComponentFixture<MatchStatsComponent>;
  // const userService = TestBed.inject(UserService);
  // const matchService = TestBed.inject(MatchService);
  // const authService = TestBed.inject(AuthService) ;
  // const userService = TestBed.inject(UserService);
  // const matchService = TestBed.inject(MatchService);
  
  let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserOfMatch']);
  let matchServiceSpy = jasmine.createSpyObj('MatchService', ['getMatchById']);
  let authService = jasmine.createSpyObj('AuthService', ['getUserId']);
  beforeEach(async () => {
    // userServiceSpy.getUserOfMatch.and.returnValue(of(userListMock));
    // matchServiceSpy.getMatchById.and.returnValue(of(matchListMock[0]));
    // authService.getUserId.and.returnValue(userListMock[0]._id);
    await TestBed.configureTestingModule({
      imports: [MatchStatsComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [{
        provide: ActivatedRoute, useValue: {
          snapshot: {
            url: [{ path: 'matches' }], paramMap: convertToParamMap({
              id: '123456789012'
            })
          }
        }
      },
      // { provide: UserService, useValue: userServiceSpy },
      // { provide: MatchService, useValue: matchServiceSpy },
      // { provide: AuthService, useValue: authService }
    ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should retrieve all the data', () => {
    const userService = TestBed.inject(UserService);
    const matchService = TestBed.inject(MatchService);
    spyOn(userService, 'getUserOfMatch').and.returnValue(of(userListMock));
    spyOn(matchService, 'getMatchById').and.returnValue(of(matchListMock[1]));
    component.ngOnInit();
    expect(component.userList.length).toBeGreaterThan(0);
  });
  
  it('should throw an error on the user promise', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'getUserOfMatch').and.returnValue(throwError({}));
    component.ngOnInit();
    expect(component.userList.length).toBe(0);
  });
  
  it('should throw an error on the match promise', () => {
    const userService = TestBed.inject(UserService);
    const matchService = TestBed.inject(MatchService);
    spyOn(userService, 'getUserOfMatch').and.returnValue(of(userListMock));
    spyOn(matchService, 'getMatchById').and.returnValue(throwError({}));
    component.ngOnInit();
    expect(component.match).toBe(undefined);
  });
  
  it('should check if the user is among admins', () => {
    const authService = TestBed.inject(AuthService);
    component.admins = userListMock;
    component.checkUser();
    Object.defineProperty(authService, 'USER_ID', { value: '1' });
    component.checkUser();
    expect(component.checkUser()).toBeTrue();
  });
  
  it('should push the user as admin', () => {
    const userService = TestBed.inject(UserService);
    const matchService = TestBed.inject(MatchService);
    spyOn(userService, 'getUserOfMatch').and.returnValue(of(userListMock));
    spyOn(matchService, 'getMatchById').and.returnValue(of(matchListMock[0]));
    component.ngOnInit();
    expect(component.admins.length).toBeGreaterThan(0);
  })
  
});
