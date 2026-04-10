import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TokenRepository } from '../../infrastructure/repository/token.repository';
import { Pool } from 'pg';

describe('TokenRepository (Unit Test with Mocks)', () => {
  let repository: TokenRepository;
  let mockPool: any;

  beforeEach(() => {
    mockPool = {
      query: vi.fn()
    };

    repository = new TokenRepository(mockPool as unknown as Pool);
  });

  it('should return true if token is valid and update is successful', async () => {
    mockPool.query.mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ email: 'flicks2006@gmail.com', is_confirmed: false }]
    });
    mockPool.query.mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ id: 4 }]
    });
    const result = await repository.validateToken('6828512');
    expect(result).toBe(true);
    expect(mockPool.query).toHaveBeenCalledTimes(2);
  });
  it('should return false if token not found', async () => {
    mockPool.query.mockResolvedValueOnce({ rowCount: 0, rows: [] });
    const result = await repository.validateToken('wrong-token');
    expect(result).toBe(false);
    expect(mockPool.query).toHaveBeenCalledTimes(1);
  });
});