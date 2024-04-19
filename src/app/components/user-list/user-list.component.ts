import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { UserStats } from '../../interfaces/user-stats';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Sort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
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
    if (this.searchQuery != '') {
      this.userList = [];
      this.finishList = false;
      this.searchQuery = '';
      this.page = 0;
      this.loadMore();
    }
  }

  sortData(sort: Sort) {
    console.log(sort);
    const data = this.userList.slice();
    if (!sort.active || sort.direction === '') {
      this.userList = data;
      return;
    }

    console.log(this.userList)
    this.userList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username': return this.sortingCompare(a.username, b.username, isAsc);
        case 'played': return this.sortingCompare(this.getPlayedNumber(a._id), this.getPlayedNumber(b._id), isAsc);
        case 'wins': return this.sortingCompare(this.getWinsNumber(a._id), this.getWinsNumber(b._id), isAsc);
        case 'goals': return this.sortingCompare(this.getGoalsNumber(a._id), this.getGoalsNumber(b._id), isAsc);
        default: return 0;
      }
    });
  }

  sortingCompare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
