import {RecommendationListType} from "../enums/RecommendationListType";
import {PrivacyStatus} from "../enums/PrivacyStatus";

export interface ListCardData {
  id: string;
  name: string;
  nameUa: string;
  creator: string;
  type: RecommendationListType;
  privacyStatus: PrivacyStatus;
  coverColor: string;
  photoUrl: string;
}
