import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Match } from '../interfaces/match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  serverUrl = this.auth.serverUrl + '/matches/'

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMatchesList(): Observable<Match[]> {
    return this.http.get<Match[]>(this.serverUrl);
  }
  getMatchesRefereeList(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.auth.serverUrl}/users/${this.auth.USER_ID}/referee`);
  }

  getMatchById(id: string): Observable<Match> {
    return this.http.get<Match>(this.serverUrl + id);
  }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(this.serverUrl, match)
  }
  updateMatch(match: Match): Observable<Match> {
    return this.http.put<Match>(this.serverUrl + match._id, match)
  }
}
