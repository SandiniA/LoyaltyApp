import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useMemberData } from './useMemberData';
import { mockMember } from '../mocks/mockData';


jest.mock('../mocks/mockApi', () => ({
    getMemberData: jest.fn(),
}));

const mockGetMemberData = jest.spyOn(require('../mocks/mockApi'), 'getMemberData');

describe('useMemberData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should show the loading state', async () => {
        mockGetMemberData.mockResolvedValueOnce(mockMember);

        const { result } = renderHook(() => useMemberData());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.member).toBeNull();
        expect(result.current.error).toBeNull();

        await waitFor(() => expect(result.current.isLoading).toBe(false));
    });

    it('should return the member data when the request succeeds', async () => {
        mockGetMemberData.mockResolvedValueOnce(mockMember);

        const { result } = renderHook(() => useMemberData());

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(mockGetMemberData).toHaveBeenCalledTimes(1);
        expect(result.current.member).toEqual(mockMember);
        expect(result.current.error).toBeNull();
    });

    it('should return an error when the request fails', async () => {
        mockGetMemberData.mockRejectedValue(new Error('Network error'));

        const { result } = renderHook(() => useMemberData());

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.member).toBeNull();
        expect(result.current.error).toBe('Something went wrong. Please try again.');
        expect(console.error).toHaveBeenCalledWith('Error fetching member data:', expect.any(Error));
    });

    it('should refetch and clear the error when retry is called', async () => {
        mockGetMemberData
            .mockRejectedValueOnce(new Error('Network error'))
            .mockResolvedValueOnce(mockMember);

        const { result } = renderHook(() => useMemberData());

        await waitFor(() => expect(result.current.error).not.toBeNull());

        await act(async () => {
            await result.current.retry();
        });

        expect(mockGetMemberData).toHaveBeenCalledTimes(2);
        expect(result.current.member).toEqual(mockMember);
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });
});
