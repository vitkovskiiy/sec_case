import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SubscribeCommandHandler } from '../../../application/commands/subscribe/SubscribeCommandHandler';
import { SubscribeCommand } from '../../../application/commands/subscribe/SubscribeCommand';
import { RepositoryNotFoundError } from '../../../domain/errors/error';

describe('SubscribeCommandHandler — SYNC notification (unit)', () => {
  let mockFactory: any;
  let mockGitHub: any;
  let mockRepository: any;
  let mockTokenGenerator: any;
  let mockNotificationService: any;
  let handler: SubscribeCommandHandler;

  const fakeSubscription = { email: 'user@example.com', repo: 'owner/repo' };

  beforeEach(() => {
    mockFactory = { createSubscription: vi.fn().mockResolvedValue(fakeSubscription) };
    mockGitHub = { check: vi.fn().mockResolvedValue(undefined) };
    mockRepository = {
      newRepo: vi.fn().mockResolvedValue(undefined),
      saveSubscription: vi.fn().mockResolvedValue(undefined),
    };
    mockTokenGenerator = { generate: vi.fn().mockReturnValue('tok-abc123') };
    mockNotificationService = { onSubscriptionConfirmed: vi.fn().mockResolvedValue(undefined) };

    handler = new SubscribeCommandHandler(
      mockFactory,
      mockGitHub,
      mockRepository,
      mockTokenGenerator,
      mockNotificationService,
    );
  });

  it('should call notificationService.onSubscriptionConfirmed after saving', async () => {
    const command = new SubscribeCommand('user@example.com', 'owner/repo');
    await handler.execute(command);

    expect(mockNotificationService.onSubscriptionConfirmed).toHaveBeenCalledOnce();
    const event = mockNotificationService.onSubscriptionConfirmed.mock.calls[0][0];
    expect(event.email).toBe('user@example.com');
    expect(event.repo).toBe('owner/repo');
    expect(event.token).toBe('tok-abc123');
  });

  it('should propagate error if notification fails (sync couples response to notification)', async () => {
    mockNotificationService.onSubscriptionConfirmed.mockRejectedValue(new Error('SMTP error'));

    const command = new SubscribeCommand('user@example.com', 'owner/repo');
    // Core op succeeded but response fails because notification is in the same call chain
    await expect(handler.execute(command)).rejects.toThrow('SMTP error');
  });

  it('should NOT call notification if repo does not exist on GitHub', async () => {
    mockGitHub.check.mockRejectedValue(new RepositoryNotFoundError('Not found'));

    const command = new SubscribeCommand('user@example.com', 'bad/repo');
    await expect(handler.execute(command)).rejects.toThrow(RepositoryNotFoundError);

    expect(mockNotificationService.onSubscriptionConfirmed).not.toHaveBeenCalled();
  });
});
