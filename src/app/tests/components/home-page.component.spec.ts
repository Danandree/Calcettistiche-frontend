import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from '../../components/home-page/home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from '../../auth/auth.service';
import { Router, provideRouter } from '@angular/router';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent, HttpClientTestingModule],
      providers: [provideAnimationsAsync(), provideRouter([
        { path: 'users/test/stats', component: HomePageComponent },
      ])],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to user stats automatically', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    Object.defineProperty(authService, 'USER_ID', { value: 'test' });
    component.ngOnInit();
    expect(router.url).toBe('/');
  });
});
