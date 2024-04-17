import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-user-personal-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './user-personal-page.component.html',
  styleUrl: './user-personal-page.component.css'
})
export class UserPersonalPageComponent {
  user?: User;
  userId = this.route.snapshot.paramMap.get('id')!;
  inputValue: string = "";
  formOpened: boolean = false;
  inputPlaceholder: string = "";
  inputLabel: string = "";

  constructor(private auth: AuthService, private userService: UserService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUserPrivate(this.userId).subscribe({
      next: (data: User) => { this.user = data },
      error: (err: any) => { console.log(err); }
    });
  }

  deleteUser() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { user: this.user! } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(this.userId).subscribe({
          next: (data: any) => {
            this.dialog.open(ConfirmationDialogComponent, { data: { message: "Utente eliminato correttamente" } });
            this.auth.logout();
          },
          error: (err: any) => { console.log(err); }
        });
      }
    });
  }

  modifyUser(label: string) {
    let user = new User();
    if (label == "Email") { user.email = this.inputPlaceholder; }
    else if (label == "Username") { user.username = this.inputPlaceholder; }
    else if (label == "Password") { user.password = this.auth.encryptPassword(this.inputPlaceholder); }
    this.userService.modifyUser(this.userId, user).subscribe({
      next: (data: any) => {
        this.dialog.open(ConfirmationDialogComponent, { data: { message: "Dati modificati correttamente" } });
        if (label == "Email") { this.user!.email = this.inputPlaceholder; }
        else if (label == "Username") { this.user!.username = this.inputPlaceholder; }
        else if (label == "Password") { this.user!.password = this.inputPlaceholder; }
        this.formOpened = false;
      },
      error: (err: any) => {
        console.log(err);
        this.dialog.open(ErrorDialogComponent, { data: { error: err.error } });
      }
    });
  }

  openForm(label: string) {
    this.inputLabel = label;
    if (label == "Email") { this.inputPlaceholder = this.user!.email; }
    else if (label == "Username") { this.inputPlaceholder = this.user!.username; }
    else if (label == "Password") { this.inputPlaceholder = ""; }
    this.formOpened = true;
  }
}
