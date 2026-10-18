import React from 'react';
import { Modal } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { OfferDetailScreen } from './OfferDetailScreen';
import { useOfferHook } from '../hooks/useOfferHook';
import { Offer, OfferStatus } from '../types/types';

jest.mock('@kichiyaki/react-native-barcode-generator', () => () => null);

const mockUseOfferHook = jest.spyOn(require('../hooks/useOfferHook'), 'useOfferHook');

const availableOffer: Offer = {
    id: '1',
    title: '10% Off on Electronics',
    description: 'Get 10% off on all electronics items.',
    pointsRequired: 500,
    terms: 'Valid for one-time use only.',
    expiresAt: '2099-12-31T23:59:59Z',
};

const mockData = {
        offerDetails: null,
        isLoading: false,
        error: null,
        retry: jest.fn(),
    }

const renderScreen = (offer: Offer = availableOffer) => {
    const props = {
        route: { key: 'OfferDetail', name: 'OfferDetail', params: { offer } },
        navigation: {},
    } as unknown as React.ComponentProps<typeof OfferDetailScreen>;

    return render(<OfferDetailScreen {...props} />);
};

describe('OfferDetailScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should pass the offer from the route params to useOfferHook', () => {
        mockUseOfferHook.mockReturnValue({
            ...mockData,
            offerDetails: availableOffer
        })

        renderScreen();

        expect(mockUseOfferHook).toHaveBeenCalledWith(availableOffer);
    });

    it('should show the skeleton loader while loading', () => {
         mockUseOfferHook.mockReturnValue({
            ...mockData,
            isLoading: true
        })

        renderScreen();

        expect(screen.getByTestId('skeleton-loader')).toBeVisible();
        expect(screen.queryByText('Redeem Offer')).toBeNull();
    });

    it('should show the error state when the request fails', () => {
         mockUseOfferHook.mockReturnValue({
            ...mockData,
            error: 'Failed to fetch offer details'
        })

        renderScreen();

        expect(screen.getByText('Failed to fetch offer details')).toBeVisible();
        expect(screen.queryByText('Redeem Offer')).toBeNull();
    });

    it('should call retry when "Try again" is pressed', () => {
        const retry = jest.fn();
  
         mockUseOfferHook.mockReturnValue({
            ...mockData,
            error: 'Failed to fetch offer details',
            retry 
        })

        renderScreen();
        fireEvent.press(screen.getByText('Try again'));

        expect(retry).toHaveBeenCalledTimes(1);
    });

    it('should show the empty state when there are no offer details', () => {
        mockUseOfferHook.mockReturnValue({
            ...mockData,
           offerDetails: null
        })

        renderScreen();

        expect(screen.getByText('Offer details not found')).toBeVisible();
    });

    it('should show the offer details', () => {
         mockUseOfferHook.mockReturnValue({
            ...mockData,
           offerDetails: availableOffer
        })

        renderScreen();

        expect(screen.getByText(availableOffer.title)).toBeVisible();
        expect(screen.getByText(availableOffer.description)).toBeVisible();
        expect(screen.getByText('Terms and Conditions')).toBeVisible();
        expect(screen.getByText(availableOffer.terms)).toBeVisible();
        expect(screen.getByText('Redeem Offer')).toBeVisible();
    });

    it('should show "Available now" for an offer that has not expired', () => {
         mockUseOfferHook.mockReturnValue({
            ...mockData,
           offerDetails: availableOffer
        })

        renderScreen();

        expect(screen.getByText(OfferStatus.Available)).toBeVisible();
    });

    it('should open the redeem modal when "Redeem Offer" is pressed', () => {
          mockUseOfferHook.mockReturnValue({
            ...mockData,
           offerDetails: availableOffer
        })

        renderScreen();
        fireEvent.press(screen.getByText('Redeem Offer'));

        expect(screen.getByText('Your reward is ready')).toBeVisible();
        expect(screen.getByText('Show this barcode to the cashier')).toBeVisible();
    });
});
