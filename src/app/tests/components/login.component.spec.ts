import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../../components/login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { User } from '../../interfaces/user';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule],
      providers: [provideAnimationsAsync()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changeLoginState', () => {
    spyOn(component.changeLoginState, 'emit');
    component.goToSignup();
    expect(component.changeLoginState.emit).toHaveBeenCalled();
  });

  it('should log the user in', () => {
    component.form.setValue({ email: 'test@example.com', password: 'test1234' });
    component.login();
    expect(component.user.email).toEqual('test@example.com');
  });
});
