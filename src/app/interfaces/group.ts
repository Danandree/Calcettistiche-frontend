export interface GroupInt {
    _id: string,
    name: string,
    createdBy: string,
    admins: [string],
    players: [string],
    createdAt: Date,
    updatedAt: Date
}

export class Group implements GroupInt {
    _id!: string;
    name!: string;
    createdBy!: string;
    admins!: [string];
    players!: [string];
    createdAt!: Date;
    updatedAt!: Date;
}