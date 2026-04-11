export interface IUnsubscribeRepository {
    deleteConnect(token:string):Promise<boolean>
}