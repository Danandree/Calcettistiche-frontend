import { User } from "../interfaces/user";
let user1 = new User();
let user2 = new User();

user1 = {
  _id: "1",
  email: "a@a.com",
  password: "a",
  role: ["user"],
  username: "a",
  pitchRole: ["user"],
  img: "",
  createdAt: new Date(),
  updatedAt: new Date()
}
user2 = {
  _id: "2",
  email: "b@b.com",
  password: "b",
  role: ["user"],
  username: "b",
  pitchRole: ["user"],
  img: "",
  createdAt: new Date(),
  updatedAt: new Date()
}
export const userListMock = [user1, user2
]