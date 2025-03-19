export interface ExternalGameDto {
  id?: number;
  appId?: number;
  name: string;
  publisher?: string;
  developer?: string;
  price?: number;
  genres?: string[];
  categories?: string[];
  rating?: number;
  ratingCount?: number;
  description?: string;
  size?: number;
  releaseDate?: string;
  version?: string;
  url?: string;
  iconUrl?: string;
}
