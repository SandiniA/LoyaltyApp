import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { LoyaltyScreen } from './LoyaltyScreen';
import { useMemberData } from '../hooks/useMemberData';
import { mockMember } from '../mocks/mockData';

const mockUseMemberData = jest.spyOn(require('../hooks/useMemberData'), 'useMemberData');

const mockData = {
    member: null,
    isLoading: false,
    error: null,
    retry: jest.fn()
}

describe('LoyaltyScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should show the skeleton loader while loading', () => {
       mockUseMemberData.mockReturnValue({
        ...mockData,
        isLoading: true
       });

        render(<LoyaltyScreen />);

        expect(screen.getByTestId('skeleton-loader')).toBeVisible();
        expect(screen.queryByText(mockMember.name)).toBeNull();
    });

    it('should show the error state when the request fails', () => {
        mockUseMemberData.mockReturnValue({
            ...mockData,
            error: 'Something went wrong. Please try again.'
        });

        render(<LoyaltyScreen />);

        expect(screen.getByText('Something went wrong. Please try again.')).toBeVisible();
        expect(screen.queryByText(mockMember.name)).toBeNull();
    });

    it('should call retry when "Try again" is pressed', () => {
        const retry = jest.fn();

        mockUseMemberData.mockReturnValue({
            ...mockData,
            error: 'Something went wrong. Please try again.',
            retry
        });

        render(<LoyaltyScreen />);
        fireEvent.press(screen.getByText('Try again'));

        expect(retry).toHaveBeenCalledTimes(1);
    });

    it('should show the empty state when there is no member', () => {
       mockUseMemberData.mockReturnValue({
        ...mockData,
        member: null
       })

        render(<LoyaltyScreen />);

        expect(screen.getByText('No loyalty account found')).toBeVisible();
    });

    it('should show the loyalty card with the member details', () => {
        mockUseMemberData.mockReturnValue({
        ...mockData,
        member: mockMember
       })

        render(<LoyaltyScreen />);

        expect(screen.getByText(mockMember.name)).toBeVisible();
        expect(screen.getByText(`Points: ${mockMember.points}`)).toBeVisible();
        expect(screen.getByText(`Tier: ${mockMember.tier}`)).toBeVisible();
    });

    it('should show the error state over the loyalty card when both are set', () => {
        mockUseMemberData.mockReturnValue({
        ...mockData,
        member: mockMember,
        error: 'Something went wrong. Please try again.'
       })

        render(<LoyaltyScreen />);

        expect(screen.getByText('Something went wrong. Please try again.')).toBeVisible();
        expect(screen.queryByText(mockMember.name)).toBeNull();
    });
});
