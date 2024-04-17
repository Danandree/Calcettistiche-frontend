import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserStats } from '../interfaces/user-stats';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverUrl = this.auth.serverUrl + '/users/';
  constructor(private http: HttpClient, private auth: AuthService) { }

  // getLoggedUser(): Observable<User> {
  //   return this.http.get<User>(`${this.serverUrl}${this.auth.USER_ID}`);
  // }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}${id}`);
  }

  getUserStats(id: string): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.serverUrl}${id}/stats`);
  }

  getUserList(page = 1, per_page = 10, username?: string): Observable<UserStats[]> {
    let url = `${this.serverUrl}?page=${page}&per_page=${per_page}`;
    if (username) { url += `&username=${username}` }
    return this.http.get<UserStats[]>(url);
  }

  getUserPrivate(id: string): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}${id}/private`);
  }

  getUserOfMatch(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.auth.serverUrl}/matches/${id}/players`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}${id}`);
  }

  modifyUser(id: string, user: User): Observable<any> {
    return this.http.put(`${this.serverUrl}${id}`, user);
  }
}
