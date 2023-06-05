import {Author} from "../authors/author";
import {Franchise} from "../franchise/franchise";
import {Platform} from "../tags/platform";
import {InterestTranslation} from "../translations/interestTranslation";
import {Tag} from "../tags/tag";
import {Photo} from "../photos/photo";

export interface GameModel {
  id: string,
  name: string,
  description: string,
  releaseDate: Date,
  trailerUrl: string,
  ageRestriction: string,
  mainPhotoUrl: string,
  averageCustomerReviewRate: number,
  isLiked: boolean,
  customerRate: number,
  customerGameStatus: number,
  developer: Author,
  publisher: Author,
  franchise: Franchise,
  genres: Array<Tag>,
  platforms: Array<Platform>,
  photos: Array<Photo>,
  translations: Array<InterestTranslation>
}
