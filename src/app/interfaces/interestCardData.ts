export interface InterestCardData {
  id: string,
  name: string,
  description: string,
  mainPhotoUrl: string,
  gameTranslations: Array<{
    cultureCode: string,
    name: string,
    description: string
  }>;
}
