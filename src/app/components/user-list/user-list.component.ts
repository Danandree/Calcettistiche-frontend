import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';
import { UserStats } from '../../interfaces/user-stats';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  searchQuery: string = '';
  finishList = false;
  page = 1;
  per_page = 20;
  displayedColumns: string[] = ['username', 'played', 'wins', 'goals'];
  userList: UserStats[] = [];
  userStats: UserStats[] = [];
  listener = {
    next: (data: UserStats[]) => {
      if (data.length == 0) {
        this.finishList = true;
        return;
      }
      this.userList = this.userList.concat(data);
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
    this.userService.getUserList(this.page, this.per_page).subscribe(this.listener);
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

  loadMore() {
    this.page += 1;
    this.userService.getUserList(this.page, this.per_page).subscribe(this.listener);
  }
  search(query: string) {
    this.userList = [];
    this.searchQuery = query;
    this.userService.getUserList(1, 100, this.searchQuery).subscribe(this.listener);
  }
  deleteSearch() {
    this.userList = [];
    this.finishList = false;
    this.searchQuery = '';
    this.page = 0;
    this.loadMore();
  }
}
