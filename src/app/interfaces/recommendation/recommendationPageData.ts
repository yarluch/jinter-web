import {InterestCardData} from "../interest/interestCardData";
import {InterestCardDataFull} from "../interest/interestCardDataFull";

export interface RecommendationPageData {
  currentInterest: Array<InterestCardData>,
  anotherInterests: Array<InterestCardDataFull>
}
