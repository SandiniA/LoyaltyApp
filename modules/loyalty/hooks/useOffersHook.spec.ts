import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useOffersHook } from './useOffersHook';
import { mockOffers } from '../mocks/mockData';
import { Offer } from '../types/types';


const mockGetOffersData = jest.spyOn(require('../mocks/mockApi'), 'getOffersData');

describe('useOffersHook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should show the loading state', async () => {
        mockGetOffersData.mockResolvedValueOnce(mockOffers);

        const { result } = renderHook(() => useOffersHook());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isRefreshing).toBe(false);
        expect(result.current.offers).toEqual([]);
        expect(result.current.error).toBeNull();

        await waitFor(() => expect(result.current.isLoading).toBe(false));
    });

    it('should return the offers when the request succeeds', async () => {
        mockGetOffersData.mockResolvedValueOnce(mockOffers);

        const { result } = renderHook(() => useOffersHook());

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(mockGetOffersData).toHaveBeenCalledTimes(1);
        expect(result.current.offers).toEqual(mockOffers);
        expect(result.current.error).toBeNull();
    });

    it('should return an error when the request fails', async () => {
        mockGetOffersData.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useOffersHook());

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.offers).toEqual([]);
        expect(result.current.error).toBe('Something went wrong. Please try again.');
        expect(console.error).toHaveBeenCalledWith('Error fetching offers data:', expect.any(Error));
    });

    it('should refetch and clear the error when retry is called', async () => {
        mockGetOffersData
            .mockRejectedValueOnce(new Error('Network error'))
            .mockResolvedValueOnce(mockOffers);

        const { result } = renderHook(() => useOffersHook());

        await waitFor(() => expect(result.current.error).not.toBeNull());

        await act(async () => {
            await result.current.retry();
        });

        expect(mockGetOffersData).toHaveBeenCalledTimes(2);
        expect(result.current.offers).toEqual(mockOffers);
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it('should set isRefreshing instead of isLoading when refresh is called', async () => {
        let resolveRefresh: (offers: Offer[]) => void;
        mockGetOffersData
            .mockResolvedValueOnce(mockOffers)
            .mockReturnValueOnce(new Promise<Offer[]>(resolve => {
                resolveRefresh = resolve;
            }));

        const { result } = renderHook(() => useOffersHook());

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        act(() => {
            result.current.refresh();
        });

        expect(result.current.isRefreshing).toBe(true);
        expect(result.current.isLoading).toBe(false);

        const refreshedOffers = [mockOffers[0]];
        await act(async () => {
            resolveRefresh(refreshedOffers);
        });

        expect(mockGetOffersData).toHaveBeenCalledTimes(2);
        expect(result.current.isRefreshing).toBe(false);
        expect(result.current.offers).toEqual(refreshedOffers);
    });

    it('should stop refreshing and return an error when refresh fails', async () => {
        mockGetOffersData
            .mockResolvedValueOnce(mockOffers)
            .mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useOffersHook());

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        await act(async () => {
            await result.current.refresh();
        });

        expect(result.current.isRefreshing).toBe(false);
        expect(result.current.error).toBe('Something went wrong. Please try again.');
        expect(result.current.offers).toEqual(mockOffers);
    });
});
