import {InterestCardData} from "../interest/interestCardData";

export interface Recommendation {
  games: Array<InterestCardData>,
  books: Array<InterestCardData>,
  movies: Array<InterestCardData>
}
