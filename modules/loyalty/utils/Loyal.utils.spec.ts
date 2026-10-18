import { getOfferExpirationStatus } from './Loyal.utils';
import { OfferStatus } from '../types/types';

const NOW = new Date('2026-06-15T12:00:00Z');

describe('getOfferExpirationStatus', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(NOW);
    });
    
    it('should return Available when the offer expires in the future', () => {
        expect(getOfferExpirationStatus({ expiresAt: '2026-12-31T23:59:59Z' })).toBe(OfferStatus.Available);
    });

    it('should return Expired when the offer expired in the past', () => {
        expect(getOfferExpirationStatus({ expiresAt: '2026-01-01T00:00:00Z' })).toBe(OfferStatus.Expired);
    });

    it('should return Expired when the offer expired one millisecond ago', () => {
        const expiresAt = new Date(NOW.getTime() - 1).toISOString();

        expect(getOfferExpirationStatus({ expiresAt })).toBe(OfferStatus.Expired);
    });

    it('should return Available when the offer expires one millisecond from now', () => {
        const expiresAt = new Date(NOW.getTime() + 1).toISOString();

        expect(getOfferExpirationStatus({ expiresAt })).toBe(OfferStatus.Available);
    });

    it('should return Expired when the offer expires exactly now', () => {
        expect(getOfferExpirationStatus({ expiresAt: NOW.toISOString() })).toBe(OfferStatus.Expired);
    });

    it('should return Available when the expiry date is invalid', () => {
        expect(getOfferExpirationStatus({ expiresAt: 'not-a-date' })).toBe(OfferStatus.Available);
    });
});
