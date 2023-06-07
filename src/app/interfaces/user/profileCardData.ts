import {Sex} from "../../enums/Sex";

export interface ProfileCardData {
  id: string,
  userName: string,
  sex: Sex,
  birthday: Date,
  photo: string,
  followersCount: number,
  followingsCount: number
}
