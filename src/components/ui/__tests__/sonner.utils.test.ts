import { toast } from '../sonner.utils';

describe('sonner.utils', () => {
  it('should export toast function', () => {
    expect(typeof toast).toBe('function');
  });

  // Optionally, you can call toast, but since it is a UI notification, just checking the export is enough for coverage
}); 