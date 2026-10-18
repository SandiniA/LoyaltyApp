import { act, renderHook } from '@testing-library/react-native';

import { useLoyaltyHook } from './useLoyaltyHook';

describe('useLoyaltyHook', () => {
    it('should show the redeem modal when handleRedeemOffer is called', () => {
        const { result } = renderHook(() => useLoyaltyHook());

        act(() => {
            result.current.handleRedeemOffer();
        });

        expect(result.current.isRedeemModalVisible).toBe(true);
    });

    it('should hide the redeem modal when handleCloseRedeemModal is called', () => {
        const { result } = renderHook(() => useLoyaltyHook());

        act(() => {
            result.current.handleRedeemOffer();
        });
        act(() => {
            result.current.handleCloseRedeemModal();
        });

        expect(result.current.isRedeemModalVisible).toBe(false);
    });
});
