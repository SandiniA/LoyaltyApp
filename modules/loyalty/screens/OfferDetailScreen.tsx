import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenNames } from "../../../navigation/AppNavigator";
import { Button, Text, View } from "react-native";
import { styles } from "../components/OfferCard/OfferCard.styled";
import { getOfferExpirationStatus } from "../utils/Loyal.utils";
import { useLoyaltyHook } from "../hooks/useLoyaltyHook";
import { RedeemOfferModal } from "../components/RedeemOfferModal/RedeemOfferModal";
import { useOfferHook } from "../hooks/useOfferHook";
import { SkeletonLoader } from "../components/SkeletonLoader/SkeletonLoader";
import { ErrorState } from "../components/ErrorState/ErrorState";
import { EmptyState } from "../components/EmptyState/EmptyState";


type Props = NativeStackScreenProps<RootStackParamList, ScreenNames.OfferDetail>;

export const OfferDetailScreen = ({ route }: Props) => {
    const { offer } = route.params;

    const { offerDetails, isLoading, error, retry } = useOfferHook(offer);
    
    const { handleRedeemOffer, isRedeemModalVisible, handleCloseRedeemModal } = useLoyaltyHook();

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={retry} />;
    }

    if (!offerDetails) {
        return <EmptyState title="Offer details not found" />;
    }

    return (
        <>
        <View style={styles.detailContainer}>
            <Text style={[styles.title, styles.detail]}>{offerDetails.title}</Text>
            <Text style={[styles.description, styles.detail]}>{offerDetails.description}</Text>
            <Text style={[styles.status, styles.detail]}>{getOfferExpirationStatus(offerDetails)}</Text>
            <View style={styles.divider} />
            <Text style={[styles.terms, styles.detail]}>Terms and Conditions</Text>
            <Text style={styles.description}>{offerDetails.terms}</Text>
            <View style={styles.Button}>
                <Button title="Redeem Offer" color="#fff" onPress={handleRedeemOffer} />
            </View>
        </View>
        <RedeemOfferModal isVisible={isRedeemModalVisible} onClose={handleCloseRedeemModal} offerTitle={offerDetails.title} />
        </>
    );
};