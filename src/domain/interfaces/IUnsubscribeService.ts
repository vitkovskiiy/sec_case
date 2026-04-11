export interface IUnsubscribeService {
    deleteSubscribe(token:string):Promise<boolean>
}