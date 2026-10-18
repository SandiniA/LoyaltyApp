import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useOfferHook } from './useOfferHook';
import { mockOffers } from '../mocks/mockData';
import { Offer } from '../types/types';

const mockGetOfferDetails = jest.spyOn(require('../mocks/mockApi'), 'getOfferDetails');

const [offer, otherOffer] = mockOffers;

describe('useOfferHook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should show the loading state', async () => {
        mockGetOfferDetails.mockResolvedValueOnce(offer);

        const { result } = renderHook(() => useOfferHook(offer));

        expect(result.current.isLoading).toBe(true);
        expect(result.current.offerDetails).toBeNull();
        expect(result.current.error).toBeNull();

        await waitFor(() => expect(result.current.isLoading).toBe(false));
    });

    it('should return the offer details when the request succeeds', async () => {
        mockGetOfferDetails.mockResolvedValueOnce(offer);

        const { result } = renderHook(() => useOfferHook(offer));

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(mockGetOfferDetails).toHaveBeenCalledTimes(1);
        expect(mockGetOfferDetails).toHaveBeenCalledWith(offer.id);
        expect(result.current.offerDetails).toEqual(offer);
        expect(result.current.error).toBeNull();
    });

    it('should return an error when the request fails', async () => {
        mockGetOfferDetails.mockRejectedValueOnce(new Error('Offer not found'));

        const { result } = renderHook(() => useOfferHook(offer));

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.offerDetails).toBeNull();
        expect(result.current.error).toBe('Failed to fetch offer details');
        expect(console.error).toHaveBeenCalledWith('Error fetching offer details:', expect.any(Error));
    });

    it('should refetch and clear the error when retry is called', async () => {
        mockGetOfferDetails
            .mockRejectedValueOnce(new Error('Network error'))
            .mockResolvedValueOnce(offer);

        const { result } = renderHook(() => useOfferHook(offer));

        await waitFor(() => expect(result.current.error).not.toBeNull());

        await act(async () => {
            await result.current.retry();
        });

        expect(mockGetOfferDetails).toHaveBeenCalledTimes(2);
        expect(result.current.offerDetails).toEqual(offer);
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it('should refetch when the offer id changes', async () => {
        mockGetOfferDetails
            .mockResolvedValueOnce(offer)
            .mockResolvedValueOnce(otherOffer);

        const { result, rerender } = renderHook(
            ({ currentOffer }: { currentOffer: Offer }) => useOfferHook(currentOffer),
            { initialProps: { currentOffer: offer } },
        );

        await waitFor(() => expect(result.current.offerDetails).toEqual(offer));

        rerender({ currentOffer: otherOffer });

        await waitFor(() => expect(result.current.offerDetails).toEqual(otherOffer));

        expect(mockGetOfferDetails).toHaveBeenCalledTimes(2);
        expect(mockGetOfferDetails).toHaveBeenLastCalledWith(otherOffer.id);
    });
});
