export interface Game {
  name: string;
  price: number;
  intro: string;
  description: string;
  genre: string;
  downloadLink: string;
  imageLink: string;
  discountPercentage?: number;
}
export interface UploadGameResponse {
  message: string;
  gameId: number;
}