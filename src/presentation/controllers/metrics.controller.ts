import { Request, Response } from 'express';
import { MetricsProvider } from '../../infrastructure/services/metrics.provider';

export class MetricsController {
  constructor(private readonly metricsProvider: MetricsProvider) {}
  async handle(req: Request, res: Response) {
    try {
      res.set('Content-Type', this.metricsProvider.contentType);
      res.end(await this.metricsProvider.getMetrics());
    } catch (error) {
      res.status(500).end(error);
    }
  }
}