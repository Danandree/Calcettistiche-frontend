import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCreateComponent } from '../../components/match-create/match-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatchService } from '../../services/match.service';
import { of, throwError } from 'rxjs';
import { userListMock } from '../../mock/userList';
import { UserStatsMock } from '../../mock/userStatsMock';
import { Match } from '../../interfaces/match';
import { matchListMock } from '../../mock/matchList';

describe('MatchCreateComponent', () => {
  let component: MatchCreateComponent;
  let fixture: ComponentFixture<MatchCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchCreateComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [provideAnimationsAsync(), {
        provide: ActivatedRoute, useValue: {
          snapshot: {
            url: [{ path: 'matches' }], paramMap: convertToParamMap({
              id: '123456789012'
            })
          }
        }
      }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all the data', () => {
    console.log(component.matchId, "MATCH ID");
    const userService = TestBed.inject(UserService);
    const matchService = TestBed.inject(MatchService);
    spyOn(userService, 'getUserList').and.returnValue(of(UserStatsMock));
    spyOn(matchService, 'getMatchById').and.returnValue(of(matchListMock[0]));
    component.ngOnInit();
    expect(component.userList.length).toBe(2);
  });

  it('should get error retrieving user list', () => {
    const userService = TestBed.inject(UserService);
    const matchService = TestBed.inject(MatchService);
    spyOn(userService, 'getUserList').and.returnValue(throwError({}));
    spyOn(matchService, 'getMatchById').and.returnValue(of(matchListMock[0]));
    component.ngOnInit();
    expect(component.userList.length).toBe(0);
  });

  it('should get error retrieving match', () => {
    const userService = TestBed.inject(UserService);
    const matchService = TestBed.inject(MatchService);
    spyOn(userService, 'getUserList').and.returnValue(of(UserStatsMock));
    spyOn(matchService, 'getMatchById').and.returnValue(throwError({}));
    component.ngOnInit();
    expect(component.userList.length).toBe(2);
  });
  it('should submit the form', () => {
    // const matchService = TestBed.inject(MatchService);
    component.matchId = null;
    component.userList = UserStatsMock;
    component.goalPerUser = { "1": 0 };
    console.log(component.goalPerUser["1"], "GOAL PER USER");
    component.form.get('team1')!.setValue([UserStatsMock[0]]);
    component.form.get('team2')!.setValue([UserStatsMock[1]]);
    component.form.get('goalTeam1')!.setValue([UserStatsMock[0]]);
    component.form.get('goalTeam2')!.setValue([UserStatsMock[1]]);
    component.form.get('admins')!.setValue([UserStatsMock[1]]);
    component.form.get('date')!.setValue(new Date());
    console.log(component.form.get('team1')!.value, "TEAM 1");
    console.log(component.userList, "USER LIST");
    // spyOn(matchService, 'createMatch').and.returnValue(of({} as any));
    component.submit();
    component.matchId = "123456789012";
    // spyOn(matchService, 'updateMatch').and.returnValue(of({} as any));
    component.submit();
    console.log(component.form.valid)
    expect(component).toBeTruthy();
  });

  it('should create new match', () => {
    const matchService = TestBed.inject(MatchService);
    component.matchId = null;
    spyOn(matchService, 'createMatch').and.returnValue(of({} as any));
    component.submit();
    expect(component).toBeTruthy();
  });

  it('should add a goal to a user', () => {
    component.goalPerUser = { "player": 0 };
    component.addGoal("player");
    expect(component.goalPerUser["player"]).toBe(1);
  });

  it('should remove a goal from a user', () => {
    component.goalPerUser = { "player": 1 };
    component.removeGoal("player");
    expect(component.goalPerUser["player"]).toBe(0);
  });

  it('should check if a user is in both teams [true]', () => {
    component.userList = UserStatsMock;
    component.form.get('team1')!.setValue([UserStatsMock[0]]);
    component.form.get('team2')!.setValue([UserStatsMock[1]]);
    expect(component.checkDouble("player")).toBeFalse();
  });

  it('should check if a user is in both teams [false]', () => {
    component.userList = UserStatsMock;
    component.form.get('team1')!.setValue([UserStatsMock[1]]);
    component.form.get('team2')!.setValue([UserStatsMock[1]]);
    expect(component.checkDouble()).toBeTrue();
  });

  it('should check if the user is in the right goal list', () => {
    component.form.get('goalTeam1')!.setValue([UserStatsMock[0]]);
    component.checkUserGoal(UserStatsMock[0], 1);
    component.checkUserGoal(UserStatsMock[1], 2);
    expect(component.form.get('goalTeam1')!.value.includes(UserStatsMock[0])).toBeFalse();
  });
});
