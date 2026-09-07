export interface ReturnGamesToDevDTO
{
    id:number;
    name: string;
    price: number;
    intro: string;
    description: string;
    genre: string;
    downloadLink: string;
    imageLink: string
    discountPercentage: number;
    hasWarning: boolean;
    isActive: boolean;
    soldAmount: number;
    earned: number;
    rating: number;
}