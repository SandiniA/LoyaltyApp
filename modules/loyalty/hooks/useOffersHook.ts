import { useCallback, useEffect, useState } from "react";
import { Offer } from "../types/types";
import { getOffersData } from "../mocks/mockApi";

export const useOffersHook = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const fetchOffers = useCallback(async (isRefresh = false) => {
        if (isRefresh) {
            setIsRefreshing(true);
        } else {
            setIsLoading(true);
        }
        setError(null);
        try {
            const offers = await getOffersData();
            setOffers(offers);
        } catch (e) {
            setError("Something went wrong. Please try again.");
            console.error("Error fetching offers data:", e);
            //you can log this error on sentry or any other error tracking service if needed
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    const refresh = useCallback(() => fetchOffers(true), [fetchOffers]);

    useEffect(() => {
        fetchOffers();
    },[fetchOffers])

    return { offers, error, isLoading, isRefreshing, retry: () => fetchOffers(), refresh };
}