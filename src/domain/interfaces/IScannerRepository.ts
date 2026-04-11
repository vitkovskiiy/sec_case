export interface IScannerRepository {
    returnListOfRepositories()
    getOldTag(name:string)
    updateTag(repo:string,tag:string)
    getAllSubscribers(repo:string)
}