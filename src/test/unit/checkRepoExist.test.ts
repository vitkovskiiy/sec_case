import { test, expect, vi } from 'vitest';
import { checkRepoExists } from '../../infrastructure/checkRepoExist';

test('возвращает true, если Гитхаб ответил 200', async () => {
    const result = await checkRepoExists.check('vitkovskiiy/Whitty');
    
    expect(result).toBe(true);
});