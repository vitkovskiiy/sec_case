import { test, expect} from 'vitest';
import { Mailer } from '../../infrastructure/mailer';

test('If miler working correctly return true', async () => {
    const token:string = "1s2f3f"
    const FAKE_CLIENT = 'test@gmail.com';
    const mailer = new Mailer()
    const result = await mailer.sendMail(FAKE_CLIENT,token);
    expect(result).toHaveProperty('messageId');
});