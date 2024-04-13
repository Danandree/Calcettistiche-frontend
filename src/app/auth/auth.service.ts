import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get USER_ID(): string | null {
    return localStorage.getItem('USER_ID');
  }

  serverUrl = environment.serverUrl;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  encryptPassword(password: string): string {
    return crypto.MD5(password).toString();
  }

  login(user: User): void {
    user.password = this.encryptPassword(user.password);
    this.http.post<User>(`${this.serverUrl}/login`, user).subscribe(
      {
        next: (user: User) => {
          localStorage.setItem('USER_ID', user._id);
          this.router.navigate(['/users', user._id, "stats"]);
        },
        error: (error: any) => {
          console.log(error.error);
          this.dialog.open(ErrorDialogComponent, { data: error });
        }
      });
  }

  logout(): void {
    this.http.post(`${this.serverUrl}/logout`, {}).subscribe({
      next: (data: any) => { console.log(data); },
      error: (error: any) => { console.log(error); },
      complete: () => {
        localStorage.removeItem('USER_ID');
        this.router.navigate(['/home']);
      },
    });
  }

  signup(user: User): void {
    user.password = this.encryptPassword(user.password);
    this.http.post<User>(`${this.serverUrl}/signup`, user).subscribe(
      {
        next: (userCreated: User) => {
          localStorage.setItem('USER_ID', userCreated._id);
          this.router.navigate(['/users', userCreated._id, "stats"]);
        },
        error: (error: any) => { console.log(error); this.dialog.open(ErrorDialogComponent, { data: error }); },
      });
  }
}
