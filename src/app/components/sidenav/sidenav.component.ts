import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Output() closeSidebar = new EventEmitter<boolean>();
  
  constructor(private auth: AuthService, private router: Router) { }
  
  isLogged(): boolean { return !!this.auth.USER_ID; }
  logout(): void { this.auth.logout(); }
  goToUserList(): void { this.router.navigate(['users']); }
  goToMatchList(): void { this.router.navigate(['matches']); }
  goToProfile(): void { this.router.navigate(['users', this.auth.USER_ID, 'private']); }
  goToStats(): void { this.router.navigate(['users', this.auth.USER_ID, 'stats']); }
  goToLogin(): void { this.router.navigate(['home']); }
  goToMatchCreate(): void { this.router.navigate(['matches/create']); }
  goToRefereeList(): void { this.router.navigate(['users', this.auth.USER_ID, 'referee']); }
}
