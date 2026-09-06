export interface EditGameDTO 
{
  id:number;
  name: string;
  price: number;
  intro: string;
  description: string;
  genre: string;
  downloadLink: string;
  imageLink: string;
  discountPercentage?: number;
}