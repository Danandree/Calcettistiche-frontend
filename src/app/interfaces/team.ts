export interface TeamInt {
    _id: string,
    name: string,
    coach: [string],
    players: [string],
    img: string,
    createdAt: Date,
    updatedAt: Date

}

export class Team implements TeamInt {
    _id!: string;
    name!: string;
    coach!: [string];
    players!: [string];
    img!: string;
    createdAt!: Date;
    updatedAt!: Date;
}
