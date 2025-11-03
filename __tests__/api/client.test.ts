import {buildImageUrl, buildBackdropUrl} from '@/api/tmdb/client';

describe('API Client Utils', () => {
  describe('buildImageUrl', () => {
    it('builds correct image URL with default size', () => {
      const url = buildImageUrl('/test.jpg');
      expect(url).toBe('https://image.tmdb.org/t/p/w500/test.jpg');
    });

    it('builds correct image URL with custom size', () => {
      const url = buildImageUrl('/test.jpg', 'w780');
      expect(url).toBe('https://image.tmdb.org/t/p/w780/test.jpg');
    });

    it('returns null for null path', () => {
      expect(buildImageUrl(null)).toBeNull();
    });
  });

  describe('buildBackdropUrl', () => {
    it('builds correct backdrop URL', () => {
      const url = buildBackdropUrl('/backdrop.jpg', 'w1280');
      expect(url).toBe('https://image.tmdb.org/t/p/w1280/backdrop.jpg');
    });

    it('returns null for null path', () => {
      expect(buildBackdropUrl(null)).toBeNull();
    });
  });
});