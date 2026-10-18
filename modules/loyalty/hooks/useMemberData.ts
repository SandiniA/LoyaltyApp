import { useCallback, useEffect, useState } from "react";
import { getMemberData } from "../mocks/mockApi";
import { Member } from "../types/types";

export const useMemberData = () => {
    const [member, setMember] = useState<Member | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMember = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await getMemberData();
            setMember(data);
        } catch (e) {
            setError("Something went wrong. Please try again.");
            console.error("Error fetching member data:", e);
            //you can log this error on sentry or any other error tracking service if needed
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMember();
    }, [fetchMember]);

    return {
        member, 
        isLoading,
        error,
        retry: fetchMember,
    };
};
