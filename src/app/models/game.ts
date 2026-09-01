export interface Game {
  id: number;
  name: string;
  description: string;
  price: number;
  releaseDate: Date;
  developer: string;
  publisher: string;
  rating: number;
  genre: string;
  details: string; 
  coverImage: string;
}