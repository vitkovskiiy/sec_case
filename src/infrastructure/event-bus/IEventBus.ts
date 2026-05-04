export type EventHandler<T> = (event: T) => Promise<void>;

export interface IEventBus {
  publish<T>(eventName: string, event: T): Promise<void>;
  subscribe<T>(eventName: string, handler: EventHandler<T>): void;
}
