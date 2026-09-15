export interface ReturnWarningEndReq{
    id:number,
    warningId:number,
    reason:string,
    requestNote:string,
    gameId:number,
    gameName:string,
    developerName:string,
    isAccepted:boolean,
    isRejected:boolean,
    doNotShowAgain:boolean
}