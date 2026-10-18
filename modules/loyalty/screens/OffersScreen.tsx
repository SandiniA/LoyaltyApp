import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EmptyState } from "../components/EmptyState/EmptyState";
import { ErrorState } from "../components/ErrorState/ErrorState";
import { OfferCard } from "../components/OfferCard/OfferCard";
import { SkeletonLoader } from "../components/SkeletonLoader/SkeletonLoader";
import { useOffersHook } from "../hooks/useOffersHook";
import { RootStackParamList, ScreenNames } from "../../../navigation/AppNavigator";



export const OffersScreen = () => {
    const { offers, isLoading, isRefreshing, error, retry, refresh } = useOffersHook();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, ScreenNames.Home>>();


    if (isLoading){
        return <SkeletonLoader/>
    }

    if (error) {
        return <ErrorState message={error} onRetry={retry} />;
    }

    if (!offers || offers.length === 0) {
        return <EmptyState title="No offers found" />
    }

    return (
        <OfferCard
            offers={offers}
            isRefreshing={isRefreshing}
            onRefresh={refresh}
            onPressOffer={(offer) => navigation.navigate(ScreenNames.OfferDetail, { offer })}
        />
    );

};