import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from '../../components/user-list/user-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserStatsMock } from '../../mock/userStatsMock';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, HttpClientTestingModule, BrowserAnimationsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user list', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'getUserList').and.returnValue(of(UserStatsMock));
    spyOn(userService, 'getUserStats').and.returnValue(of(UserStatsMock[0]));
    component.ngOnInit();
    expect(component.userList).toEqual(UserStatsMock);
  });
  it('should retrieve an error getting the user list', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'getUserList').and.returnValue(throwError({}));
    component.ngOnInit();
    expect(component.userList).toEqual([]);
  });
  it('should retrieve an error getting the user stats', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'getUserList').and.returnValue(of(UserStatsMock));
    spyOn(userService, 'getUserStats').and.returnValue(throwError({}));
    component.ngOnInit();
    expect(component.userStats).toEqual([]);
  });
  
  it('should get the goals number', () => {
    component.userStats = UserStatsMock
    component.getGoalsNumber("1");
    expect(component.getGoalsNumber("1")).toBe(1);
  });
  
  it('should get the wins number', () => {
    component.userStats = UserStatsMock
    component.getWinsNumber("1");
    expect(component.getWinsNumber("1")).toBe(1);
  });
  
  it('should get the number of played matches', () => {
    component.userStats = UserStatsMock
    component.getPlayedNumber("1");
    expect(component.getPlayedNumber("1")).toBe(2);
  });
  
  it('should get the image url', () => {
    component.userStats = UserStatsMock
    component.getImgUrl("1");
    expect(component.getImgUrl("1")).toBe("");
  });
  it('should load more users', () => {
    component.page = 1;
    component.loadMore();
    expect(component.page).toBe(2);
  });

  it('should search for username', () => {
    component.search("test");
    expect(component.searchQuery).toBe("test");
  });

  it('should delete the querySearch', () => {
    component.deleteSearch();
    expect(component.searchQuery).toBe("");
  });
});
