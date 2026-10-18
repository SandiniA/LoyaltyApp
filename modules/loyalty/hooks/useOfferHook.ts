import { useCallback, useEffect, useState } from "react";
import { Offer } from "../types/types";
import { getOfferDetails } from "../mocks/mockApi";


export const useOfferHook = (offer: Offer) => {
    const [offerDetails, setOfferDetails] = useState<Offer | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchOfferDetails = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const offerDetails = await getOfferDetails(offer.id);
            setOfferDetails(offerDetails);

        }catch (e) {
            setError("Failed to fetch offer details");
            console.error("Error fetching offer details:", e);
        } finally {
            setIsLoading(false);
        }
    }, [offer.id]);

    useEffect(() => {
        fetchOfferDetails();
    }, [fetchOfferDetails]);

    return { offerDetails, isLoading, error, retry: fetchOfferDetails };
}