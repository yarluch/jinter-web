import {Franchise} from "../franchise/franchise";
import {Author} from "../authors/author";
import {Tag} from "../tags/tag";
import {Photo} from "../photos/photo";
import {MovieTranslation} from "../translations/movieTranslation";

export interface MovieModel {
  id: string,
  name: string,
  description: string,
  releaseDate: Date,
  trailerUrl: string,
  ageRestriction: string,
  mainPhotoUrl: string,
  country: string,
  duration: number,
  imdbRate: 0,
  averageCustomerReviewRate: number,
  isLiked: boolean,
  isSerial: boolean,
  customerRate: number,
  customerMovieStatus: number,
  franchise: Franchise,
  actors: Array<Author>,
  composers: Array<Author>,
  designers: Array<Author>,
  directors: Array<Author>,
  operators: Array<Author>,
  producers: Array<Author>,
  scriptWriters: Array<Author>,
  genres: Array<Tag>,
  tags: Array<Tag>,
  photos: Array<Photo>,
  translations: Array<MovieTranslation>
}
