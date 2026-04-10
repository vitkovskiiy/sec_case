import { test, expect} from 'vitest';
import { tokenRepository } from '../..';


test('Validate token', async () => {
    const token:string = "6828512"
    const fakeToken:string = "6828512"
    const FAKE_CLIENT = 'vitkovskyi.i.s.-im44@edu.kpi.ua';
    const failToken = await tokenRepository.validateToken(fakeToken);
    const comapreToken = await tokenRepository.validateToken(token);
    console.log(comapreToken);
    expect(comapreToken).returned(true);
});