import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../interfaces/user';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @Output() changeLoginState = new EventEmitter();
  user = new User();
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
  });

  constructor(private auth: AuthService, private router: Router) { }
  signup() {
    console.log("SINGUP");
    if (this.form.valid) {
      this.user.username = this.form.value.username!;
      this.user.email = this.form.value.email!;
      this.user.password = this.form.value.password!;
      this.auth.signup(this.user);
    }
  }
  goToLogin() {
    this.changeLoginState.emit();
  }
}
