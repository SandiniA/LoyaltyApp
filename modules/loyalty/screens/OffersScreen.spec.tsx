import React from 'react';
import { FlatList } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { OffersScreen } from './OffersScreen';
import { useOffersHook } from '../hooks/useOffersHook';
import { Offer, OfferStatus } from '../types/types';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../navigation/AppNavigator', () => ({
    ScreenNames: { Home: 'Home', OfferDetail: 'OfferDetail' },
}));

const mockUseOffersHook = jest.spyOn(require('../hooks/useOffersHook'), 'useOffersHook');

const coffeeOffer: Offer = {
    id: '1',
    title: 'Free Coffee',
    description: 'Enjoy a free coffee at participating cafes.',
    pointsRequired: 200,
    terms: 'Valid for one-time use only.',
    expiresAt: '2099-12-31T23:59:59Z',
};

const electronicsOffer: Offer = {
    id: '2',
    title: '10% Off on Electronics',
    description: 'Get 10% off on all electronics items.',
    pointsRequired: 500,
    terms: 'Valid for one-time use only.',
    expiresAt: '2099-12-31T23:59:59Z',
};

const expiredOffer: Offer = {
    id: '3',
    title: '20% Off on Apparel',
    description: 'Get 20% off on all apparel items.',
    pointsRequired: 800,
    terms: 'Valid for one-time use only.',
    expiresAt: '2000-01-01T00:00:00Z',
};

const mockData = {
    offers: [],
    isLoading: false,
    isRefreshing: false,
    error: null,
    retry: jest.fn(),
    refresh: jest.fn(),
}

describe('OffersScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should show the skeleton loader while loading', () => {
        mockUseOffersHook.mockReturnValue({
            ...mockData,
            isLoading: true
        })

        render(<OffersScreen />);

        expect(screen.getByTestId('skeleton-loader')).toBeVisible();
        expect(screen.queryByText('Your Offers')).toBeNull();
    });

    it('should show the error state when the request fails', () => {
            mockUseOffersHook.mockReturnValue({
            ...mockData,
            error: 'Something went wrong. Please try again.' 
        })


        render(<OffersScreen />);

        expect(screen.getByText('Something went wrong. Please try again.')).toBeVisible();
        expect(screen.queryByText('Your Offers')).toBeNull();
    });

    it('should call retry when "Try again" is pressed', () => {
        const retry = jest.fn();
     
        mockUseOffersHook.mockReturnValue({
            ...mockData,
            error: 'Something went wrong. Please try again.', 
            retry
        })

        render(<OffersScreen />);
        fireEvent.press(screen.getByText('Try again'));

        expect(retry).toHaveBeenCalledTimes(1);
    });

    it('should show the empty state when there are no offers', () => {
          mockUseOffersHook.mockReturnValue({
            ...mockData,
            offers: []
        })

        render(<OffersScreen />);

        expect(screen.getByText('No offers found')).toBeVisible();
    });

    it('should show the list of offers', () => {
        mockUseOffersHook.mockReturnValue({
            ...mockData,
            offers: [coffeeOffer, electronicsOffer]
        })

        render(<OffersScreen />);

        expect(screen.getByText('Your Offers')).toBeVisible();
        expect(screen.getByText(coffeeOffer.title)).toBeVisible();
        expect(screen.getByText(coffeeOffer.description)).toBeVisible();
        expect(screen.getByText(electronicsOffer.title)).toBeVisible();
        expect(screen.getByText(electronicsOffer.description)).toBeVisible();
        expect(screen.getAllByText(OfferStatus.Available)).toHaveLength(2);
    });

    it('should hide expired offers', () => {
            mockUseOffersHook.mockReturnValue({
            ...mockData,
            offers: [coffeeOffer, expiredOffer]
        })

        render(<OffersScreen />);

        expect(screen.getByText(coffeeOffer.title)).toBeVisible();
        expect(screen.queryByText(expiredOffer.title)).toBeNull();
        expect(screen.queryByText(OfferStatus.Expired)).toBeNull();
    });

    it('should navigate to the offer detail screen when an offer is pressed', () => {
             mockUseOffersHook.mockReturnValue({
            ...mockData,
            offers: [coffeeOffer, electronicsOffer]
        })


        render(<OffersScreen />);
        fireEvent.press(screen.getByText(electronicsOffer.title));

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('OfferDetail', { offer: electronicsOffer });
    });

    it('should call refresh when the list is pulled to refresh', () => {
        const refresh = jest.fn();
       
           mockUseOffersHook.mockReturnValue({
            ...mockData,
            offers: [coffeeOffer],
            refresh
        })


        render(<OffersScreen />);
        fireEvent(screen.getByTestId('offer-list'), 'refresh');

        expect(refresh).toHaveBeenCalledTimes(1);
    });
});
