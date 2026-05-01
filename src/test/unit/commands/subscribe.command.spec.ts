import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SubscribeCommandHandler } from '../../../application/commands/subscribe/SubscribeCommandHandler';
import { SubscribeCommand } from '../../../application/commands/subscribe/SubscribeCommand';
import { AlreadySubscribedError, RepositoryNotFoundError } from '../../../domain/errors/error';

describe('SubscribeCommandHandler (unit)', () => {
  let mockFactory: any;
  let mockGitHub: any;
  let mockMailer: any;
  let mockRepository: any;
  let handler: SubscribeCommandHandler;

  beforeEach(() => {
    mockFactory = {
      createSubscription: vi.fn(),
    };
    mockGitHub = {
      check: vi.fn(),
    };
    mockMailer = {
      sendMail: vi.fn(),
    };
    mockRepository = {
      newRepo: vi.fn(),
      saveSubscription: vi.fn(),
    };

    handler = new SubscribeCommandHandler(mockFactory, mockGitHub, mockMailer, mockRepository);
  });

  it('should successfully create a subscription and send confirmation email', async () => {
    const fakeSubscription = { email: 'user@example.com', repo: 'owner/repo' };
    mockFactory.createSubscription.mockResolvedValue(fakeSubscription);
    mockGitHub.check.mockResolvedValue(undefined);
    mockRepository.newRepo.mockResolvedValue(undefined);
    mockRepository.saveSubscription.mockResolvedValue(undefined);
    mockMailer.sendMail.mockResolvedValue(undefined);

    const command = new SubscribeCommand('user@example.com', 'owner/repo');
    await expect(handler.execute(command)).resolves.toBeUndefined();

    expect(mockGitHub.check).toHaveBeenCalledWith('owner/repo');
    expect(mockFactory.createSubscription).toHaveBeenCalledWith('user@example.com', 'owner/repo');
    expect(mockRepository.saveSubscription).toHaveBeenCalled();
    expect(mockMailer.sendMail).toHaveBeenCalledWith('user@example.com', 'owner/repo', expect.any(String));
  });

  it('should throw RepositoryNotFoundError when repo does not exist on GitHub', async () => {
    mockGitHub.check.mockRejectedValue(new RepositoryNotFoundError('Repo not found'));

    const command = new SubscribeCommand('user@example.com', 'owner/nonexistent');
    await expect(handler.execute(command)).rejects.toThrow(RepositoryNotFoundError);

    expect(mockFactory.createSubscription).not.toHaveBeenCalled();
    expect(mockMailer.sendMail).not.toHaveBeenCalled();
  });

  it('should throw AlreadySubscribedError when subscription already exists', async () => {
    mockGitHub.check.mockResolvedValue(undefined);
    mockFactory.createSubscription.mockRejectedValue(
      new AlreadySubscribedError('Subscription already exists'),
    );

    const command = new SubscribeCommand('user@example.com', 'owner/repo');
    await expect(handler.execute(command)).rejects.toThrow(AlreadySubscribedError);

    expect(mockRepository.saveSubscription).not.toHaveBeenCalled();
    expect(mockMailer.sendMail).not.toHaveBeenCalled();
  });

  it('should not return any value (command returns void)', async () => {
    const fakeSubscription = { email: 'user@example.com', repo: 'owner/repo' };
    mockFactory.createSubscription.mockResolvedValue(fakeSubscription);
    mockGitHub.check.mockResolvedValue(undefined);
    mockRepository.newRepo.mockResolvedValue(undefined);
    mockRepository.saveSubscription.mockResolvedValue(undefined);
    mockMailer.sendMail.mockResolvedValue(undefined);

    const command = new SubscribeCommand('user@example.com', 'owner/repo');
    const result = await handler.execute(command);

    // Commands must not return data
    expect(result).toBeUndefined();
  });
});
