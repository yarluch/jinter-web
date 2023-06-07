import {RecommendationListType} from "../enums/RecommendationListType";
import {PrivacyStatus} from "../enums/PrivacyStatus";
import {ProfileCardData} from "./user/profileCardData";

export interface ListCardData {
  id: string;
  name: string;
  nameUa: string;
  creator: string;
  ownerProfile: ProfileCardData;
  type: RecommendationListType;
  privacyStatus: PrivacyStatus;
  coverColor: string;
  photoUrl: string;
}
