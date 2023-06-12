import {InterestTranslation} from "../../interest/translations/interestTranslation";
import {AuthorCardData} from "../../user/AuthorCardData";

export interface GameReviewModel {
  id: string,
  reviewTitle: string,
  reviewDescription: string,
  game: {
    id: string,
    translations: Array<InterestTranslation>
  },
  rate: number,
  isLikedByLoggedUser: boolean,
  author: AuthorCardData
}
