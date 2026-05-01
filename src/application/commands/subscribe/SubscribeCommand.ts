export class SubscribeCommand {
  constructor(
    public readonly email: string,
    public readonly repo: string,
  ) {}
}
