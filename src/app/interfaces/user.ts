export interface UserInt {
    _id: string,
    email: string,
    password: string,
    role: [string],
    username: string,
    pitchRole: [string],
    img: string,
    createdAt: Date,
    updatedAt: Date
}

export class User implements UserInt {
    _id!: string;
    email!: string;
    password!: string;
    role!: [string];
    username!: string;
    pitchRole!: [string];
    img!: string;
    createdAt!: Date;
    updatedAt!: Date;
}
