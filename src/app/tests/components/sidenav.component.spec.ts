import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../auth/auth.service';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavComponent, HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout the user', () => {
    const authService = TestBed.inject(AuthService);
    component.logout();
    expect(authService.USER_ID).toBe(null);
  });

  it('shoud navigate around pages whitout USER_ID', () => {
    component.goToUserList();
    component.goToMatchCreate();
    component.goToMatchList();
    component.goToLogin();
    expect(component).toBeTruthy();
  });

  it('shoud navigate around pages whit USER_ID', () => {
    const authService = TestBed.inject(AuthService);
    Object.defineProperty(authService, 'USER_ID', { value: '12345678902134' });
    component.goToRefereeList();
    component.goToStats();
    component.goToProfile();
    expect(component).toBeTruthy();
  });
});
