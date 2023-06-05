import {Author} from "../authors/author";
import {Franchise} from "../franchise/franchise";
import {Tag} from "../tags/tag";
import {Photo} from "../photos/photo";
import {InterestTranslation} from "../translations/interestTranslation";

export interface BookModel {
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
  customerBookStatus: number,
  author: Author,
  publisher: Author,
  franchise: Franchise,
  genres: Array<Tag>,
  tags: Array<Tag>,
  photos: Array<Photo>,
  translations: Array<InterestTranslation>
}
