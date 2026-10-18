import { EmptyState } from "../components/EmptyState/EmptyState";
import { ErrorState } from "../components/ErrorState/ErrorState";
import { LoyaltyCard } from "../components/LoyaltyCard/LoyaltyCard";
import { SkeletonLoader } from "../components/SkeletonLoader/SkeletonLoader";
import { useMemberData } from "../hooks/useMemberData";

export const LoyaltyScreen = () => {
    const { member, isLoading, error, retry } = useMemberData();

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={retry} />;
    }

    if (!member) {
        return <EmptyState title="No loyalty account found" />;
    }

    return <LoyaltyCard member={member} />;
};
