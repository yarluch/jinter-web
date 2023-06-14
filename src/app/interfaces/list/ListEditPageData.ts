import {PrivacyStatus} from "../../enums/PrivacyStatus";
import {RecommendationListType} from "../../enums/RecommendationListType";

export interface ListEditPageData {
  name: string,
  nameUa: string,
  creator: string,
  interests: Array<string>,
  type: RecommendationListType,
  privacyStatus: PrivacyStatus,
  coverColor: string,
  photoUrl: string
}
