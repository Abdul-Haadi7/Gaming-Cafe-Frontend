export interface ReturnGamesToAdminDTO
{
    id:number;
    name:string;
    price:number;
    genre: string;
    discountPercentage: number;
    developerName:string;
    rating: number;
    hasWarning : boolean;
    isPublic:boolean;
}