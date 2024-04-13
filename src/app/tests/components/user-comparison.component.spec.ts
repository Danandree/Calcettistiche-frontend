import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComparisonComponent } from '../../components/user-comparison/user-comparison.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserStatsMock } from '../../mock/userStatsMock';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';

describe('UserComparisonComponent', () => {
  let component: UserComparisonComponent;
  let fixture: ComponentFixture<UserComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComparisonComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [provideAnimationsAsync()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should retrieve the user list', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'getUserList').and.returnValue(of(UserStatsMock));
    component.ngOnInit();
    expect(component.userList).toEqual(UserStatsMock);
  });
  it('should get an error retrieving the user list', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'getUserList').and.returnValue(throwError({}));
    component.ngOnInit();
    expect(component.userList).toEqual([]);
  });
  it('should check if an user exists', () => {
    component.user1Id = "1";
    component.user2Id = "2";
    component.checkUserExist(UserStatsMock);
    component.user2Id = null;
    component.checkUserExist(UserStatsMock);
    component.user1Id = null;
    component.checkUserExist(UserStatsMock);
    const spy = spyOn(component, 'checkUserExist').and.callThrough();
    expect(spy).toBeTruthy();
  });

  it('should change the user comparison', () => {
    component.onChangeUser("1");
    component.onChangeUser("2",false);
    expect(component.user1Id).toBe("1");
  });
});
