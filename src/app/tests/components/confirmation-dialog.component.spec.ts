import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {}}],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
