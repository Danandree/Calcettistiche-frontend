import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { MatchCreateComponent } from '../../components/match-create/match-create.component';
import { MatchesListComponent } from '../../components/matches-list/matches-list.component';
import { HomePageComponent } from '../../components/home-page/home-page.component';
import { UserStats } from '../../interfaces/user-stats';
import { UserPersonalPageComponent } from '../../components/user-personal-page/user-personal-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../auth/auth.service';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavComponent, HttpClientTestingModule],
      providers: [provideRouter([
        { path: 'users', component: SidenavComponent },
        { path: 'matches/create', component: MatchCreateComponent },
        { path: 'matches', component: MatchesListComponent },
        { path: 'home', component: HomePageComponent },
        { path: 'users/12345678902134/referee', component: MatchesListComponent },
        { path: 'users/12345678902134/stats', component: UserStats },
        { path: 'users/12345678902134/private', component: UserPersonalPageComponent },
      ])],
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
