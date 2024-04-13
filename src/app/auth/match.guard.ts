import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatchService } from '../services/match.service';
import { AuthService } from '../auth/auth.service';
import { Match } from '../interfaces/match';

export const matchGuard: CanActivateFn = (route, state) => {
  const matchId = route.paramMap.get('id');
  const matchService = inject(MatchService);
  const auth = inject(AuthService);
  const router = inject(Router)
  return new Promise((resolve, reject) => {
    matchService.getMatchById(matchId!).subscribe({
      next: (data: Match) => {
        let flag = false;
        if (data.createdBy == auth.USER_ID) { flag = true; }
        for (let user of data.referee) {
          if (user == auth.USER_ID) { flag = true; }
        }
        if (!flag) { router.navigate(['/matches', data._id]); }
        resolve(flag);
      },
      error: (err: any) => { console.log(err); }
    });
  });
}
