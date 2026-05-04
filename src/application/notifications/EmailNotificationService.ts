import { IMailer } from '../../domain/interfaces/IMailer';
import { SubscriptionConfirmedEvent } from '../events/SubscriptionConfirmedEvent';
import { ReleaseDetectedEvent } from '../events/ReleaseDetectedEvent';
import { INotificationService } from './INotificationService';

export class EmailNotificationService implements INotificationService {
  constructor(private readonly mailer: IMailer) {}

  async onSubscriptionConfirmed(event: SubscriptionConfirmedEvent): Promise<void> {
    await this.mailer.sendMail(event.email, event.token, event.repo);
  }

  async onReleaseDetected(event: ReleaseDetectedEvent): Promise<void> {
    for (const email of event.subscribers) {
      await this.mailer.sendNotify(email, event.repo, event.tag);
    }
  }
}
