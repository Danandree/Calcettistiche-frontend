import { Component } from '@angular/core';
import { Match } from '../../interfaces/match';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-match-stats',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    DatePipe,
    MatButtonModule
  ],
  templateUrl: './match-stats.component.html',
  styleUrl: './match-stats.component.css'
})
export class MatchStatsComponent {
  match?: Match;
  userList: User[] = [];
  team1Score: number = 0;
  team2Score: number = 0;
  playerTeam1: User[] = [];
  playerTeam2: User[] = [];
  playerGoals: User[] = [];
  admins: User[] = [];
  matchId = this.route.snapshot.paramMap.get('id');
  listenerForUserList = {
    next: (data: User[]) => {
      this.userList = data;
      this.matchService.getMatchById(this.matchId!).subscribe(this.matchListener);
    },
    error: (err: any) => { console.log(err); }
  }
  matchListener = {
    next: (match: Match) => {
      this.match = match;
      this.userList.forEach(user => {
        if (this.match!.team1.includes(user._id)) { this.playerTeam1.push(user); }
        if (this.match!.team2.includes(user._id)) { this.playerTeam2.push(user); }
        if (this.match?.referee.includes(user._id) && this.match!.createdBy != user._id) { this.admins.push(user); }
        if (this.match?.createdBy == user._id) { this.admins.push(user); }
        this.match!.goals.forEach(goal => {
          if (user._id == goal) {
            this.playerGoals.push(user);
            if (this.match!.team1.includes(user._id)) { this.team1Score++; }
            if (this.match!.team2.includes(user._id)) { this.team2Score++; }
          }
        });
      });
    },
    error: (err: any) => { console.log(err); }
  }
  constructor(private auth: AuthService, private route: ActivatedRoute, private matchService: MatchService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserOfMatch(this.matchId!).subscribe(this.listenerForUserList);
  }
  checkUser(): boolean {
    for (let user of this.admins) {
      if (this.auth.USER_ID == user._id) { return true; }
    }
    return false;
  }
  teamMaxLength() { return (this.match!.team1.length > this.match!.team2.length) ? this.match!.team1 : this.match!.team2 }
}
