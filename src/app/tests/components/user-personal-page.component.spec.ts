import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalPageComponent } from '../../components/user-personal-page/user-personal-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { userListMock } from '../../mock/userList';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

describe('UserPersonalPageComponent', () => {
  let component: UserPersonalPageComponent;
  let fixture: ComponentFixture<UserPersonalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPersonalPageComponent, HttpClientTestingModule, RouterTestingModule],
      // providers:[{provide: MatDialog, useValue: {open: () => {true}}}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserPersonalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get private user data', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'getUserPrivate').and.returnValue(of(userListMock[0]));
    component.ngOnInit();
    expect(component.user).toEqual(userListMock[0]);
  });
  it('should get error retrieving private user data', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'getUserPrivate').and.returnValue(throwError({}));
    component.ngOnInit();
    expect(component.user).toEqual(undefined);
  });

  it('should modify the user', () => {
    const userService = TestBed.inject(UserService);
    component.user = userListMock[1];
    spyOn(userService, 'modifyUser').and.returnValue(of(userListMock[0]));
    component.modifyUser("Email");
    component.modifyUser("Password");
    component.modifyUser("Username");
    expect(component.user.email).toBe('');
  });
  it('should get error modifying the user', () => {
    const userService = TestBed.inject(UserService);
    component.user = userListMock[1];
    spyOn(userService, 'modifyUser').and.returnValue(throwError({}));
    component.modifyUser("Email");
    expect(component.user._id).toBe('2');
  });

  it('should open the form', () => {
    component.user = userListMock[0];
    component.openForm("Email");
    component.openForm("Username");
    component.openForm("Password");
    expect(component.formOpened).toBeTruthy();
  });

  it('should delete the user', () => {
    const userService = TestBed.inject(UserService);
    component.user = userListMock[0];
    spyOn(userService, 'deleteUser').and.returnValue(of(userListMock[0]));
    component.deleteUser();
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<any>);
    component.deleteUser();
    expect(component.deleteUser).toBeTruthy();
  });
  it('should get error deleting the user', () => {
    const userService = TestBed.inject(UserService);
    component.user = userListMock[0];
    spyOn(userService, 'deleteUser').and.returnValue(throwError({}));
    component.deleteUser();
    expect(component.deleteUser).toBeTruthy();
  });
});
