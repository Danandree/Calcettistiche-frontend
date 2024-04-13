import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatsComponent } from '../../components/user-stats/user-stats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UserStatsMock } from '../../mock/userStatsMock';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';

describe('UserStatsComponent', () => {
  let component: UserStatsComponent;
  let fixture: ComponentFixture<UserStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStatsComponent, HttpClientTestingModule, RouterTestingModule],
      providers:[ {
        provide: ActivatedRoute, useValue: {
          snapshot: {
            url: [{ path: 'compare' }], paramMap: convertToParamMap({
              id: '1'
            })
          }
        }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.userId).toBe("1");
  });
  it('should retrieve the user stats', () => {
    const userService = TestBed.inject(UserService);
    const spy = spyOn(userService, 'getUserStats').and.returnValue(of(UserStatsMock[0]));
    component.ngOnInit();
    expect(component.userStats).toBe(UserStatsMock[0]);
  });
  it('should get error on retrieve the user stats', () => {
    const userService = TestBed.inject(UserService);
    const spy = spyOn(userService, 'getUserStats').and.returnValue(throwError({}));
    component.ngOnInit();
    expect(component.userStats).toBe(undefined);
  });
  it('should set the chart options and data', () => {
    component.userStats = UserStatsMock[0];
    component.setChartGoals();
    component.setChartTeamsWin();
    component.setChartTeams();
    const spy = spyOn(component, 'setChartOptions').and.callThrough();
    component.setChartOptions();
    expect(spy).toHaveBeenCalled();
  });
});
