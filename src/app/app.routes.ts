import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { Page404Component } from './components/page404/page404.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatchesListComponent } from './components/matches-list/matches-list.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { MatchStatsComponent } from './components/match-stats/match-stats.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { Page403Component } from './components/page403/page403.component';
import { UserPersonalPageComponent } from './components/user-personal-page/user-personal-page.component';
import { MatchCreateComponent } from './components/match-create/match-create.component';
import { UserComparisonComponent } from './components/user-comparison/user-comparison.component';
import { matchGuard } from './auth/match.guard';

export const routes: Routes = [
    { path: 'matches', component: MatchesListComponent },
    { path: 'matches/create', component: MatchCreateComponent, canActivate: [authGuard] },
    { path: 'matches/:id', component: MatchStatsComponent },
    { path: 'matches/:id/edit', component: MatchCreateComponent, canActivate: [authGuard, matchGuard] },
    { path: 'users', component: UserListComponent },
    { path: 'users/:id/referee', component: MatchesListComponent },
    { path: 'users/:id/compare', component: UserComparisonComponent },
    { path: 'users/:id/compare/:compareId', component: UserComparisonComponent },
    { path: 'users/:id/stats', component: UserStatsComponent },
    { path: 'users/:id/private', component: UserPersonalPageComponent, canActivate: [authGuard] },
    { path: 'home', component: HomePageComponent },
    { path: 'forbidden', component: Page403Component, canActivate: [authGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: Page404Component, canActivate: [authGuard] }
];
