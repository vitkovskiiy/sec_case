import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScannerService } from '../../../application/services/scanner.service'; 
describe('ScannerService (Unit)', () => {
  let mockRepo: any;
  let mockGitHub: any;
  let mockEmailSender: any;
  let scannerService: ScannerService;

beforeEach(() => {
    mockRepo = {
      returnListOfRepositories: vi.fn(), 
      getOldTag: vi.fn(), 
      updateLastSeenTag: vi.fn(),
      getConfirmedSubscribers: vi.fn(),
    };
    
    mockGitHub = { checkReleases: vi.fn() };
    mockEmailSender = { sendReleaseEmail: vi.fn() };

    scannerService = new ScannerService(mockRepo, mockGitHub, mockEmailSender);
  });

  it('should skip the mailing if the release has not changed', async () => {
    mockRepo.returnListOfRepositories.mockResolvedValue([{ name: 'test/repo' }]);
    mockRepo.getOldTag.mockResolvedValue('v1.0');
    mockGitHub.checkReleases.mockResolvedValue('v1.0');

    await scannerService.checker();

    expect(mockRepo.updateLastSeenTag).not.toHaveBeenCalled();
    expect(mockEmailSender.sendReleaseEmail).not.toHaveBeenCalled();
  });
});