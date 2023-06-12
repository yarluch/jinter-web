import {InterestTranslation} from "../../interest/translations/interestTranslation";
import {AuthorCardData} from "../../user/AuthorCardData";

export interface MovieReviewModel {
  id: string,
  reviewTitle: string,
  reviewDescription: string,
  movie: {
    id: string,
    translations: Array<InterestTranslation>
  },
  rate: number,
  isLikedByLoggedUser: boolean,
  author: AuthorCardData
}
