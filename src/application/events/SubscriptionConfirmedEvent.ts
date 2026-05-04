export class SubscriptionConfirmedEvent {
  public readonly occurredAt: Date;

  constructor(
    public readonly email: string,
    public readonly repo: string,
    public readonly token: string,
  ) {
    this.occurredAt = new Date();
    Object.freeze(this);
  }
}
