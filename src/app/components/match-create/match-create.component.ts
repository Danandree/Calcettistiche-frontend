import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserStats } from '../../interfaces/user-stats';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/auth.service';
import { Match } from '../../interfaces/match';
import { MatchService } from '../../services/match.service';
import { teamsValidator } from '../../validators/teams.validators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-match-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgClass,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './match-create.component.html',
  styleUrl: './match-create.component.css'
})
export class MatchCreateComponent {
  matchId = this.route.snapshot.paramMap.get('id');
  userList: UserStats[] = [];
  match = new Match();
  goalPerUser: { [key: string]: number } = {};
  form = this.fb.group({
    team1: new FormControl([]),
    team2: new FormControl([]),
    goalTeam1: new FormControl([]),
    goalTeam2: new FormControl([]),
    date: new FormControl,
    admins: new FormControl([]),
  }, { validator: teamsValidator });

  matchSubmitListener = {
    next: (data: Match) => { this.router.navigate(['/matches', data._id]); },
    error: (err: any) => {
      console.log(err);
      this.dialog.open(ErrorDialogComponent, { data: err });
    }
  }

  constructor(private userService: UserService,
    private auth: AuthService,
    private matchService: MatchService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    let team1: UserStats[] = [];
    let team2: UserStats[] = [];
    let admins: UserStats[] = [];
    let goals: UserStats[] = [];
    let goalTeam1: UserStats[] = [];
    let goalTeam2: UserStats[] = [];
    this.userService.getUserList().subscribe({
      next: (data: UserStats[]) => {
        this.userList = data;
        if (this.matchId) {
          this.matchService.getMatchById(this.matchId).subscribe({
            next: (data: Match) => {
              this.match = data;
              for (let user of this.userList) {
                this.goalPerUser[user._id] = 0;
                if (this.match.team1.includes(user._id)) { team1.push(user); }
                if (this.match.team2.includes(user._id)) { team2.push(user); }
                if (this.match.referee.includes(user._id)) { admins.push(user); }
                if (this.match.goals.includes(user._id)) { goals.push(user); }
                for (let goal of this.match.goals) {
                  if (user._id == goal) { this.goalPerUser[user._id]++; }
                }
              }
              for (let user of goals) {
                if (this.match.team1.includes(user._id)) { goalTeam1.push(user); }
                if (this.match.team2.includes(user._id)) { goalTeam2.push(user); }
              }
              this.form.get('team1')!.setValue(team1);
              this.form.get('team2')!.setValue(team2);
              this.form.get('admins')!.setValue(admins);
              this.form.get('goalTeam1')!.setValue(goalTeam1);
              this.form.get('goalTeam2')!.setValue(goalTeam2);
              this.form.get('date')!.setValue(this.match.date);
            },
            error: (err: any) => { console.log(err) }
          });
        }
        else {
          for (let user of this.userList) {
            this.goalPerUser[user._id] = 0;
          }
        }
      },
      error: (err: any) => { console.log(err) }
    });
  }
  submit() {
    this.match.date = new Date();
    this.match.team1 = [''];
    this.match.team2 = [''];
    this.match.referee = [''];
    this.match.goals = [''];
    if (!this.matchId) { this.match.createdBy = this.auth.USER_ID!; }
    let team1 = this.form.get('team1')!.value;
    let team2 = this.form.get('team2')!.value;
    let admins = this.form.get('admins')!.value;
    let goalTeam1 = this.form.get('goalTeam1')!.value;
    let goalTeam2 = this.form.get('goalTeam2')!.value;
    for (let user of this.userList) {
      if (team1.includes(user)) { this.match.team1.push(user._id); }
      if (team2.includes(user)) { this.match.team2.push(user._id); }
      if (admins.includes(user)) { this.match.referee.push(user._id); }
      if (goalTeam1.includes(user) || goalTeam2.includes(user)) {
        for (let i = 0; i < this.goalPerUser[user._id]; i++) { this.match.goals.push(user._id); }
      }
    }
    this.match.team1.shift();
    this.match.team2.shift();
    this.match.referee.shift();
    this.match.goals.shift();
    if (this.form.get('date')!.value) { this.match.date = this.form.get('date')!.value; }
    if (this.form.valid) {
      if (this.matchId) { this.matchService.updateMatch(this.match).subscribe(this.matchSubmitListener); }
      else { this.matchService.createMatch(this.match).subscribe(this.matchSubmitListener); }
    }
  }

  checkDouble(username?: string): boolean {
    if (username) {
      return (this.form.get('team1')!.value?.includes(username) && this.form.get('team2')!.value?.includes(username)) ? true : false;
    }
    for (let user of this.form.get('team1')!.value!) {
      if (this.form.get('team2')!.value!.includes(user)) {
        return true;
      }
    }
    return false;
  }

  addGoal(id: string) { this.goalPerUser[id]++; }
  removeGoal(id: string) { (this.goalPerUser[id] > 0) ? this.goalPerUser[id]-- : this.goalPerUser[id]; }
  getTeamGoalSum(team: number): number {
    let goalTeam = (team == 1) ? this.form.get('goalTeam1')!.value : this.form.get('goalTeam2')!.value;
    let sum = 0
    for (let user of goalTeam) {
      sum += this.goalPerUser[user._id];
    }
    return sum;
  }

  checkUserGoal(user: UserStats, team = 1) {
    let goalPerTeam = (team == 1) ? this.form.get('goalTeam1')!.value : this.form.get('goalTeam2')!.value;
    if (goalPerTeam.includes(user)) {
      this.goalPerUser[user._id] = 0;
      goalPerTeam = goalPerTeam.filter((x: UserStats) => x._id != user._id);
    }
    if (team == 1) { this.form.get('goalTeam1')!.setValue(goalPerTeam); }
    if (team == 2) { this.form.get('goalTeam2')!.setValue(goalPerTeam); }
  }

}
