import { Component } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Match } from '../../interfaces/match';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-matches-list',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './matches-list.component.html',
  styleUrl: './matches-list.component.css'
})
export class MatchesListComponent {
  title = 'Lista partite'
  finishList = false;
  page = 1;
  per_page = 20;
  matchDate: string | undefined;
  displayedColumns: string[] = ['date', 'result', 'player'];
  matchesList?: Match[];
  matchesListener = {
    next: (data: Match[]) => {
      this.matchesList = this.matchesList?.concat(data) || data;
      if (data.length == 0) {
        this.finishList = true;
        return;
      }
    },
    error: (err: any) => { console.log(err); },
  }

  constructor(private matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path == 'matches') {
      this.matchService.getMatchesList(this.page, this.per_page).subscribe(this.matchesListener);
    }
    else {
      this.title += ' modificabili';
      this.matchService.getMatchesRefereeList(this.page, this.per_page).subscribe(this.matchesListener);
    }
  }

  loadMore() {
    this.page += 1;
    this.matchService.getMatchesList(this.page, this.per_page, this.matchDate).subscribe(this.matchesListener);
  }
  searchDate(event: any) {
    this.matchesList = undefined;
    this.page = 1;
    this.matchDate = event.value;
    if (this.route.snapshot.url[0].path == 'matches') {
      this.matchService.getMatchesList(this.page, 100, this.matchDate).subscribe(this.matchesListener);
    }else{
      this.matchService.getMatchesRefereeList(this.page, 100, this.matchDate).subscribe(this.matchesListener);
    }
  }

  resetDate() {
    this.matchDate = undefined;
    this.finishList = false;
    this.matchesList = [];
    this.page = 0;
    this.loadMore();
  }
}
