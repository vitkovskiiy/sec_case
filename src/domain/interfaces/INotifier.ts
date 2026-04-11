export interface INotifier {
    notifyAll():Promise<boolean>
    notifySubscribers(): Promise<boolean>
}