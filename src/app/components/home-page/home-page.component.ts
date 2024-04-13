import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    LoginComponent,
    SignupComponent,
    NgClass
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  logOrSign = true;
  
  constructor(private auth: AuthService, private router: Router) { }
  
  ngOnInit() {
    if (this.auth.USER_ID) {
      this.router.navigate(['/users', this.auth.USER_ID, 'stats']);
    }
  }
  isLogged(): boolean { return !!this.auth.USER_ID; }
}
