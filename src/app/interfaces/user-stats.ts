export interface UserStatsInt {
    _id: string,
    wins: [string],
    draws: [string],
    goals: [string],
    team1: [string],
    team2: [string],
    username: string,
    img: string,
    totalMatch: number
}

export class UserStats implements UserStatsInt {
    _id!: string
    wins!: [string];
    draws!: [string];
    goals!: [string];
    team1!: [string];
    team2!: [string];
    username!: string;
    img!: string;
    totalMatch!: number
}
