export class ReleaseDetectedEvent {
  public readonly occurredAt: Date;

  constructor(
    public readonly repo: string,
    public readonly tag: string,
    public readonly subscribers: string[],
  ) {
    this.occurredAt = new Date();
    Object.freeze(this);
  }
}
