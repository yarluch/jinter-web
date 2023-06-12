import {AuthorCardData} from "../user/AuthorCardData";
import {InterestTranslation} from "../interest/translations/interestTranslation";

export interface ReviewCardData {
  id: string,
  reviewTitle: string,
  reviewDescription: string,
  interest: {
    id: string,
    translations: Array<InterestTranslation>
  },
  rate: number,
  isLikedByLoggedUser: boolean,
  author: AuthorCardData
}
