import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UnsubscribeCommandHandler } from '../../../application/commands/unsubscribe/UnsubscribeCommandHandler';
import { UnsubscribeCommand } from '../../../application/commands/unsubscribe/UnsubscribeCommand';
import { NotFoundToken } from '../../../domain/errors/error';

describe('UnsubscribeCommandHandler (unit)', () => {
  let mockRepository: any;
  let handler: UnsubscribeCommandHandler;

  beforeEach(() => {
    mockRepository = {
      deleteConnect: vi.fn(),
    };
    handler = new UnsubscribeCommandHandler(mockRepository);
  });

  it('should successfully delete a subscription by token', async () => {
    mockRepository.deleteConnect.mockResolvedValue(undefined);

    // Token length != 8 passes validation (Token entity throws if length IS 8)
    const command = new UnsubscribeCommand('valid-token-abc123');
    await expect(handler.execute(command)).resolves.toBeUndefined();

    expect(mockRepository.deleteConnect).toHaveBeenCalledWith('valid-token-abc123');
  });

  it('should throw NotFoundToken when token does not exist', async () => {
    mockRepository.deleteConnect.mockRejectedValue(new NotFoundToken('Token not found'));

    const command = new UnsubscribeCommand('nonexistent-token');
    await expect(handler.execute(command)).rejects.toThrow(NotFoundToken);
  });

  it('should not return any value (command returns void)', async () => {
    mockRepository.deleteConnect.mockResolvedValue(undefined);

    const command = new UnsubscribeCommand('valid-token-abc123');
    const result = await handler.execute(command);
    expect(result).toBeUndefined();
  });
});
