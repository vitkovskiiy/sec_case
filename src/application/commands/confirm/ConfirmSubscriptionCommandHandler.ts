import { ITokenRepository } from '../../../domain/interfaces/ITokenRepository';
import { Token } from '../../../domain/entities/Token';
import { NotFoundToken } from '../../../domain/errors/error';
import { ConfirmSubscriptionCommand } from './ConfirmSubscriptionCommand';

export class ConfirmSubscriptionCommandHandler {
  constructor(private readonly tokenRepository: ITokenRepository) {}

  async execute(command: ConfirmSubscriptionCommand): Promise<void> {
    const tokenEntity = new Token(command.token);
    const exists = await this.tokenRepository.validateToken(tokenEntity.token);
    if (!exists) {
      throw new NotFoundToken('Token not found');
    }
  }
}
