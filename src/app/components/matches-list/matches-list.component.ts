import { Component } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Match } from '../../interfaces/match';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-matches-list',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatTableModule
  ],
  templateUrl: './matches-list.component.html',
  styleUrl: './matches-list.component.css'
})
export class MatchesListComponent {
  title = 'Lista partite'
  displayedColumns: string[] = ['date', 'result', 'player'];
  matchesList?: Match[];
  matchesListener = {
    next: (data: Match[]) => { this.matchesList = data; },
    error: (err: any) => { console.log(err); },
  }

  constructor(private matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path == 'matches') {
      this.matchService.getMatchesList().subscribe(this.matchesListener);
    }
    else {
      this.title += ' modificabili';
      this.matchService.getMatchesRefereeList().subscribe(this.matchesListener);
    }
  }
}
