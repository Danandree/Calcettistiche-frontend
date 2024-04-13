import { User } from "./user";

export interface MatchInt {
    _id: string,
    team1: [string],
    team2: [string],
    goals: [string],
    createdBy: string,
    referee: [string],
    checked: boolean,
    note: string,
    date: Date,
    createdAt: Date,
    updatedAt: Date

}

export class Match implements MatchInt {
    _id!: string;
    team1!: [string];
    team2!: [string];
    goals!: [string];
    createdBy!: string;
    referee!: [string];
    checked!: boolean;
    note!: string;
    date!: Date;
    createdAt!: Date;
    updatedAt!: Date;
} 
