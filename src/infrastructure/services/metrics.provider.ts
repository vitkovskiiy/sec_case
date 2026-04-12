import client from 'prom-client';

export class MetricsProvider {
  constructor() {
    client.collectDefaultMetrics({
      prefix: 'github_notifier_',
    });
  }

  async getMetrics(): Promise<string> {
    return await client.register.metrics();
  }

  get contentType(): string {
    return client.register.contentType;
  }
}