import { Match } from "../interfaces/match";

let match1 = new Match();
let match2 = new Match();

match1 = {
    _id: "1",
    team1: ["1"],
    team2: ["1"],
    goals: ["1"],
    createdBy: "4",
    referee: ["1"],
    checked: false,
    note: "1",
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
}
match2 = {
    _id: "2",
    team1: ["2"],
    team2: ["2"],
    goals: ["2"],
    createdBy: "2",
    referee: ["2"],
    checked: false,
    note: "2",
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
}

export const matchListMock = [match1, match2]