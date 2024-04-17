import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: { user: { username: "Mario" } } }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
