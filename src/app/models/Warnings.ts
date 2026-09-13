export interface Warning{
    id:number,
    gameId:number,
    gameName:string,
    reason:string,
    issuedBy:number,
    issuedAt:Date,
    requestedToEnd:boolean
}