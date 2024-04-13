import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent, HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu', () => {
    component.menuButtonClick();
    expect(component.menuIsOpen).toBe(true);
    component.menuButtonClick();
    expect(component.menuIsOpen).toBe(false);
  });
});
