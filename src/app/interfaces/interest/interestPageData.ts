import {Tag} from "./tags/tag";
import {Photo} from "./photos/photo";

export interface InterestPageData {
  id: string,
  name: string,
  description: string,
  releaseDate: Date,
  trailerUrl: string,
  mainPhotoUrl: string,
  ageRestriction: string,
  averageCustomerReviewRate: number,
  isLiked: boolean,
  customerRate: number,
  status: number,
  tags: Array<Tag>,
  genres: Array<Tag>,
  photos: Array<Photo>
}
