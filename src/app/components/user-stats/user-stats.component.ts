import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserStats } from '../../interfaces/user-stats';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './user-stats.component.html',
  styleUrl: './user-stats.component.css'
})
export class UserStatsComponent {
  userStats?: UserStats;
  @Input() userId = this.route.snapshot.paramMap.get('id');
  compareButton = true;
  team1Wins = 0;
  team1Draws = 0;
  team1Loses = 0;
  team2Wins = 0;
  team2Draws = 0;
  team2Loses = 0;
  goalsTeam1 = 0;
  goalsTeam2 = 0;
  listener = {
    next: (data: UserStats) => {
      this.userStats = data;
      this.userStats.team1.forEach((match: string) => {
        this.userStats?.wins.includes(match) ? this.team1Wins++ : this.team1Loses++;
      });
      this.userStats.team2.forEach((match: string) => {
        this.userStats?.wins.includes(match) ? this.team2Wins++ : this.team2Loses++;
      });
      this.userStats.goals.forEach((goal: string) => {
        this.userStats?.team1.includes(goal) ? this.goalsTeam1++ : this.goalsTeam2++;
      });
      this.userStats.draws.forEach((draw: string) => {
        this.userStats?.team1.includes(draw) ? this.team1Draws++ : this.team2Draws++;
      });
      this.chartMatches = this.setChartOptions();
      this.chartTeams = this.setChartTeams();
      this.chartTeamsWin = this.setChartTeamsWin();
      this.chartGoals = this.setChartGoals();
    },
    error: (err: any) => { console.log(err); }
  }
  
  chartMatches = {};
  chartTeams = {};
  chartTeamsWin = {};
  chartGoals = {};
  
  constructor(private userService: UserService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.userService.getUserStats(this.userId!).subscribe(this.listener);
    for (let path of this.route.snapshot.url) {
      if (path.path == "compare") { this.compareButton = false; }
    }
  }
  
  setChartOptions() {
    return {
      backgroundColor: "#72b8ff",
      animationEnabled: true,
      title: {
        text: "Partite totali",
        fontSize: 28
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        yValueFormatString: "#,###.##",
        showInLegend: true,
        dataPoints: [
          { y: this.userStats!.wins.length, name: "Vittorie" },
          { y: ((this.userStats!.team1.length + this.userStats!.team2.length) - this.userStats!.wins.length), name: "Sconfitte" },
          { y: (this.userStats!.draws.length), name: "Pareggi" },
          { y: (this.userStats!.totalMatch - (this.userStats!.team1.length + this.userStats!.team2.length)), name: "Non giocate" },
        ]
      }]
    }
  }
  
  setChartGoals() {
    return {
      animationEnabled: true,
      backgroundColor: "#72b8ff",
      title: {
        text: "Goal",
        fontSize: 28
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        yValueFormatString: "#,###.##",
        showInLegend: true,
        dataPoints: [
          { y: this.goalsTeam1, name: "Goal Team 1" },
          { y: this.goalsTeam2, name: "Goal Team 2" },
        ]
      }],
    }
  }

  setChartTeamsWin() {
    return {
      animationEnabled: true,
      backgroundColor: "#72b8ff",
      title: {
        text: "Risultati per team",
        fontSize: 28
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        yValueFormatString: "#,###.##",
        showInLegend: true,
        dataPoints: [
          { y: this.team1Wins, name: "Vittorie Team 1" },
          { y: this.team2Wins, name: "Vittorie Team 2" },
          { y: this.team1Draws, name: "Pareggi Team 1" },
          { y: this.team2Draws, name: "Pareggi Team 2" },
          { y: this.team1Loses, name: "Sconfitte Team 1" },
          { y: this.team2Loses, name: "Sconfitte Team 2" },
        ]
      }],
    }
  }
  
  setChartTeams() {
    return {
      animationEnabled: true,
      backgroundColor: "#72b8ff",
      title: {
        text: "Partite per team",
        fontSize: 28
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        yValueFormatString: "#,###.##",
        showInLegend: true,
        dataPoints: [
          { y: this.userStats!.team1.length, name: "Team 1" },
          { y: this.userStats!.team2.length, name: "Team 2" },
          { y: (this.userStats!.totalMatch - (this.userStats!.team1.length + this.userStats!.team2.length)), name: "Non giocate" },
        ]
      }]
    }
  }

}
