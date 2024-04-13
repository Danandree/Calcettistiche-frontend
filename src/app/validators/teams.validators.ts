import { AbstractControl, ValidationErrors } from '@angular/forms';

export function teamsValidator(control: AbstractControl): ValidationErrors | null {
  const team1 = control.get('team1')?.value;
  const team2 = control.get('team2')?.value;

  if (team1 && team2) {
    for (let user of team1) {
      if (team2.includes(user)) {
        return { sameTeamError: true };
      }
    }
  }
  if(team1.length == 0||  team2.length == 0){
    return { emptyTeamError: true };
  }
  return null;

}
