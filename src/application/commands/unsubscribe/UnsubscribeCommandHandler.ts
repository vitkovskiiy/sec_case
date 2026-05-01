import { IUnsubscribeRepository } from '../../../domain/repositories/IUnsubscribeRepository';
import { Token } from '../../../domain/entities/Token';
import { UnsubscribeCommand } from './UnsubscribeCommand';

export class UnsubscribeCommandHandler {
  constructor(private readonly repository: IUnsubscribeRepository) {}

  async execute(command: UnsubscribeCommand): Promise<void> {
    const tokenEntity = new Token(command.token);
    await this.repository.deleteConnect(tokenEntity.token);
  }
}
