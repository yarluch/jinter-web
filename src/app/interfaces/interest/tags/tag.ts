import {TagTranslation} from "../translations/tagTranslation";

export interface Tag {
  id: string,
  name: string,
  translations: Array<TagTranslation>
}
