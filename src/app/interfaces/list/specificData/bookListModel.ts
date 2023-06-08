import {ProfileCardData} from "../../user/profileCardData";
import {RecommendationListType} from "../../../enums/RecommendationListType";
import {PrivacyStatus} from "../../../enums/PrivacyStatus";
import {InterestCardData} from "../../interest/interestCardData";

export interface BookListModel {
  id: string;
  name: string;
  nameUa: string;
  creator: string;
  ownerProfile: ProfileCardData;
  isAddedToOwnLists: boolean;
  type: RecommendationListType;
  privacyStatus: PrivacyStatus;
  coverColor: string;
  photoUrl: string;
  books: Array<InterestCardData>;
}
