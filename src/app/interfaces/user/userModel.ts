import {Sex} from "../../enums/Sex";

export interface UserModel {
  id: string,
  userName: string,
  description: string,
  sex: Sex,
  birthday: Date,
  photo: string,
  followersCount: number,
  followingsCount: number
  isFollowing: boolean
}
