import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from '../../components/signup/signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, HttpClientTestingModule],
      providers: [provideAnimationsAsync()],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not signup the user', () => {
    component.signup();
    component.form.get('password')!.setValue("test");
    component.signup();
    component.form.get('password')!.setValue("test123456789012345678901234567890");
    component.signup();
    console.log(component.form.get('password')!.value)
    expect(component.form.valid).toBeFalse();
  });

  it('should signup the user', () => {
    component.form.get('username')!.setValue("test1234");
    component.form.get('email')!.setValue("test1234@example.com");
    component.form.get('password')!.setValue("test1234");
    component.signup();
    expect(component.form.valid).toBeTrue();
  });

  it('should change to login page', () => {
    const spy = spyOn(component.changeLoginState, 'emit');
    component.goToLogin();
    expect(spy).toBeTruthy();
  });
});
