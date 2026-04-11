export interface IUnsubscribeRepository {
    deleteConnect(token:string):Promise<{email:string,token:string}>
}