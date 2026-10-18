import { OfferStatus } from "../types/types";

export const getOfferExpirationStatus = (offer: { expiresAt: string }): OfferStatus => {
    const currentDate = new Date();
    const expirationDate = new Date(offer.expiresAt);

    if (expirationDate <= currentDate) {
        return OfferStatus.Expired;
    };
        
    return OfferStatus.Available;
};