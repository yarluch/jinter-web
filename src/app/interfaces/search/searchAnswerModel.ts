import {InterestCardData} from "../interest/interestCardData";

export interface SearchAnswerModel {
  entities: Array<InterestCardData>,
  page: number,
  pageSize: number,
  totalLength: number
}
