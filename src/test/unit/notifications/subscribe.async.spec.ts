import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SubscribeCommandHandlerAsync } from '../../../application/commands/subscribe/SubscribeCommandHandlerAsync';
import { SubscribeCommand } from '../../../application/commands/subscribe/SubscribeCommand';
import { InMemoryEventBus } from '../../../infrastructure/event-bus/InMemoryEventBus';
import { SubscriptionConfirmedEvent } from '../../../application/events/SubscriptionConfirmedEvent';

describe('SubscribeCommandHandlerAsync — ASYNC notification via EventBus (unit)', () => {
  let mockFactory: any;
  let mockGitHub: any;
  let mockRepository: any;
  let mockTokenGenerator: any;
  let eventBus: InMemoryEventBus;
  let handler: SubscribeCommandHandlerAsync;

  const fakeSubscription = { email: 'user@example.com', repo: 'owner/repo' };

  beforeEach(() => {
    mockFactory = { createSubscription: vi.fn().mockResolvedValue(fakeSubscription) };
    mockGitHub = { check: vi.fn().mockResolvedValue(undefined) };
    mockRepository = {
      newRepo: vi.fn().mockResolvedValue(undefined),
      saveSubscription: vi.fn().mockResolvedValue(undefined),
    };
    mockTokenGenerator = { generate: vi.fn().mockReturnValue('tok-abc123') };
    eventBus = new InMemoryEventBus();

    handler = new SubscribeCommandHandlerAsync(
      mockFactory,
      mockGitHub,
      mockRepository,
      mockTokenGenerator,
      eventBus,
    );
  });

  it('should complete immediately without waiting for subscriber', async () => {
    const subscriberDelay = vi.fn().mockImplementation(
      () => new Promise((res) => setTimeout(res, 500)),
    );
    eventBus.subscribe('SubscriptionConfirmed', subscriberDelay);

    const start = Date.now();
    const command = new SubscribeCommand('user@example.com', 'owner/repo');
    await handler.execute(command);
    const elapsed = Date.now() - start;

    // Core op finishes well before the 500ms subscriber delay
    expect(elapsed).toBeLessThan(100);
  });

  it('should publish SubscriptionConfirmedEvent with correct data', async () => {
    const receivedEvents: SubscriptionConfirmedEvent[] = [];
    eventBus.subscribe<SubscriptionConfirmedEvent>('SubscriptionConfirmed', async (event) => {
      receivedEvents.push(event);
    });

    const command = new SubscribeCommand('user@example.com', 'owner/repo');
    await handler.execute(command);

    // Wait for setImmediate to fire
    await new Promise((res) => setImmediate(res));

    expect(receivedEvents).toHaveLength(1);
    expect(receivedEvents[0].email).toBe('user@example.com');
    expect(receivedEvents[0].repo).toBe('owner/repo');
    expect(receivedEvents[0].token).toBe('tok-abc123');
  });

  it('should NOT fail the core operation if subscriber throws', async () => {
    eventBus.subscribe('SubscriptionConfirmed', async () => {
      throw new Error('Notification service is down');
    });

    const command = new SubscribeCommand('user@example.com', 'owner/repo');
    // Core op must succeed — subscriber failure is isolated
    await expect(handler.execute(command)).resolves.toBeUndefined();

    expect(mockRepository.saveSubscription).toHaveBeenCalled();
  });

  it('published event should be immutable (frozen)', async () => {
    let capturedEvent: SubscriptionConfirmedEvent | null = null;
    eventBus.subscribe<SubscriptionConfirmedEvent>('SubscriptionConfirmed', async (e) => {
      capturedEvent = e;
    });

    await handler.execute(new SubscribeCommand('user@example.com', 'owner/repo'));
    await new Promise((res) => setImmediate(res));

    expect(Object.isFrozen(capturedEvent)).toBe(true);
  });
});
