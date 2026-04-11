import { test, expect, vi } from 'vitest';
import { Mailer } from '../../infrastructure/mailer';
import nodemailer from 'nodemailer'; // Импортируем, чтобы проверять вызовы

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn().mockReturnValue({
      sendMail: vi.fn().mockResolvedValue({ messageId: 'test-id' })
    })
  }
}));

test('If mailer working correctly return true', async () => {
    const token: string = "1s2f3f";
    const FAKE_CLIENT = 'test@gmail.com';
    const mailer = new Mailer();
    const result = await mailer.sendMail(FAKE_CLIENT, token);
    expect(result.message).toHaveProperty('messageId', 'test-id');;
});