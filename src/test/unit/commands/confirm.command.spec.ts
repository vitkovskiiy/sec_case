import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfirmSubscriptionCommandHandler } from '../../../application/commands/confirm/ConfirmSubscriptionCommandHandler';
import { ConfirmSubscriptionCommand } from '../../../application/commands/confirm/ConfirmSubscriptionCommand';
import { NotFoundToken } from '../../../domain/errors/error';

describe('ConfirmSubscriptionCommandHandler (unit)', () => {
  let mockTokenRepository: any;
  let handler: ConfirmSubscriptionCommandHandler;

  beforeEach(() => {
    mockTokenRepository = {
      validateToken: vi.fn(),
    };
    handler = new ConfirmSubscriptionCommandHandler(mockTokenRepository);
  });

  it('should confirm subscription for a valid existing token', async () => {
    mockTokenRepository.validateToken.mockResolvedValue(true);

    const command = new ConfirmSubscriptionCommand('valid-token-abc123');
    await expect(handler.execute(command)).resolves.toBeUndefined();

    expect(mockTokenRepository.validateToken).toHaveBeenCalledWith('valid-token-abc123');
  });

  it('should throw NotFoundToken when token does not exist in the database', async () => {
    mockTokenRepository.validateToken.mockResolvedValue(false);

    const command = new ConfirmSubscriptionCommand('unknown-token-xyz');
    await expect(handler.execute(command)).rejects.toThrow(NotFoundToken);
  });

  it('should not return any value (command returns void)', async () => {
    mockTokenRepository.validateToken.mockResolvedValue(true);

    const command = new ConfirmSubscriptionCommand('valid-token-abc123');
    const result = await handler.execute(command);
    expect(result).toBeUndefined();
  });
});
