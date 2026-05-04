import { SubscriptionConfirmedEvent } from '../events/SubscriptionConfirmedEvent';
import { ReleaseDetectedEvent } from '../events/ReleaseDetectedEvent';

export interface INotificationService {
  onSubscriptionConfirmed(event: SubscriptionConfirmedEvent): Promise<void>;
  onReleaseDetected(event: ReleaseDetectedEvent): Promise<void>;
}
