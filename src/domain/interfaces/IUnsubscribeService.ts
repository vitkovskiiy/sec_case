export interface IUnsubscribeService {
    deleteSubscribe(token:string):Promise<{email:string,token:string}>
}