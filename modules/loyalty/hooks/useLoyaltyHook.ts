import { useCallback, useState } from "react";

export const useLoyaltyHook = () => {
    const [isRedeemModalVisible, setIsRedeemModalVisible] = useState<boolean>(false);

    const handleRedeemOffer = useCallback(() => {
        setIsRedeemModalVisible(true);
    }, []);

    const handleCloseRedeemModal = useCallback(() => {
        setIsRedeemModalVisible(false);
    }, []);

    return {
        isRedeemModalVisible,
        handleRedeemOffer,
        handleCloseRedeemModal,
    };
};