import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../interfaces/user';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() changeLoginState = new EventEmitter();
  user: User = new User();
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  });

  constructor(private auth: AuthService, private router: Router, public dialog: MatDialog) { }

  login() {
    console.log(this.form.value, "LOGIN PAGE");
    if (this.form.valid) {
      this.user.email = this.form.value.email!
      this.user.password = this.form.value.password!
      this.auth.login(this.user);
    }
  }
  goToSignup() {
    this.changeLoginState.emit();
  }
}
