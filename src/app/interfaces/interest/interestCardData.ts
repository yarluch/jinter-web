import {InterestTranslation} from "./translations/interestTranslation";

export interface InterestCardData {
  id: string,
  name: string,
  description: string,
  mainPhotoUrl: string,
  translations: Array<InterestTranslation>;
}
