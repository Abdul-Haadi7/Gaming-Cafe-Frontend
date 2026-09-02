export interface GameDTO {
  userid: string;
  id: number;
  name: string;
  price: number;
}
export interface UploadGameResponse {
  message: string;
  gameId: number;
}