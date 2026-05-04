import { EventHandler, IEventBus } from './IEventBus';

export class InMemoryEventBus implements IEventBus {
  private readonly handlers = new Map<string, EventHandler<unknown>[]>();

  subscribe<T>(eventName: string, handler: EventHandler<T>): void {
    const existing = this.handlers.get(eventName) ?? [];
    this.handlers.set(eventName, [...existing, handler as EventHandler<unknown>]);
  }

  async publish<T>(eventName: string, event: T): Promise<void> {
    const eventHandlers = this.handlers.get(eventName) ?? [];

    // Fire-and-forget: основна операція не чекає завершення обробників
    setImmediate(() => {
      for (const handler of eventHandlers) {
        handler(event).catch((err) => {
          console.error(`[EventBus] Handler for "${eventName}" failed:`, err);
        });
      }
    });
  }
}
