import {InterestTranslation} from "./translations/interestTranslation";

export interface InterestCardData {
  id: string,
  mainPhotoUrl: string,
  averageCustomerReviewRate: number,
  translations: Array<InterestTranslation>;
}
