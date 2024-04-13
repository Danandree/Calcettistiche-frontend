import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';
import { UserStats } from '../../interfaces/user-stats';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  displayedColumns: string[] = ['username', 'played', 'wins', 'goals'];
  userList: UserStats[] = [];
  userStats: UserStats[] = [];
  listener = {
    next: (data: UserStats[]) => {
      this.userList = data;
      this.userList.forEach(user => {
        this.userService.getUserStats(user._id).subscribe({
          next: (data: UserStats) => { this.userStats.push(data); },
          error: (err: any) => { console.log(err); }
        });
      });
    },
    error: (err: any) => { console.log(err); }
  }
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(this.listener);
  }
  getGoalsNumber(userId: string) {
    let goals = 0;
    this.userStats.forEach(user => {
      if (user._id == userId) { goals = user.goals.length; }
    });
    return goals;
  }
  getWinsNumber(userId: string) {
    let wins = 0;
    this.userStats.forEach(user => {
      if (user._id == userId) { wins = user.wins.length; }
    });
    return wins;
  }
  getPlayedNumber(userId: string) {
    let played = 0;
    this.userStats.forEach(user => {
      if (user._id == userId) { played = user.team1.length + user.team2.length; }
    });
    return played;
  }
  getImgUrl(userId: string) {
    let img = "";
    this.userStats.forEach(user => {
      if (user._id == userId) { img = user.img; }
    });
    return img;
  }
}
