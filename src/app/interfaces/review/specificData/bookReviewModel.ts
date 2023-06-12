import {InterestTranslation} from "../../interest/translations/interestTranslation";
import {AuthorCardData} from "../../user/AuthorCardData";

export interface BookReviewModel {
  id: string,
  reviewTitle: string,
  reviewDescription: string,
  book: {
    id: string,
    translations: Array<InterestTranslation>
  },
  rate: number,
  isLikedByLoggedUser: boolean,
  author: AuthorCardData
}
