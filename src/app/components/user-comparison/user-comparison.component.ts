import { Component } from '@angular/core';
import { UserStatsComponent } from '../user-stats/user-stats.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserStats } from '../../interfaces/user-stats';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-comparison',
  standalone: true,
  imports: [
    UserStatsComponent,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-comparison.component.html',
  styleUrl: './user-comparison.component.css'
})
export class UserComparisonComponent {
  userList: UserStats[] = [];
  user1Id = this.route.snapshot.paramMap.get('id');
  user2Id = this.route.snapshot.paramMap.get('compareId');

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.userService.getUserList().subscribe({
      next: (data: UserStats[]) => { this.userList = data.sort((a, b) => a.username.localeCompare(b.username)) },
      error: (err: any) => { console.log(err); }
    });
  }

  onChangeUser(id: string, user1 = true) {
    user1 ? this.user1Id = id : this.user2Id = id
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/users/${this.user1Id}/compare/${this.user2Id}`])
    );
  }

  checkUserExist(userList: UserStats[]): boolean {
    let user1 = false;
    let user2 = false;
    for (let user of userList) {
      if (user._id == this.user1Id) { user1 = true; }
      if (user._id == this.user2Id) { user2 = true; }
    }
    if (this.user2Id == null) { user2 = true }
    return (user1 && user2) ? true : false
  }
}
