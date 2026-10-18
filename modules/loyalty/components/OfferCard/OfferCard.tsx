import { FlatList, Pressable, Text, View } from "react-native";
import { Offer, OfferStatus } from "../../types/types";
import { getOfferExpirationStatus } from "../../utils/Loyal.utils";
import { styles } from "./OfferCard.styled";
import { ScreenNames } from "../../../../navigation/AppNavigator";
import { EmptyState } from "../EmptyState/EmptyState";

type OfferCardProps = {
    offers: Offer[];
    onPressOffer: (offer: Offer) => void;
    isRefreshing?: boolean;
    onRefresh?: () => void;
};

export const OfferCard = ({ offers, onPressOffer, isRefreshing = false, onRefresh }: OfferCardProps) => {

    const renderOfferItem = ({ item }: { item: Offer }) => {
        if (getOfferExpirationStatus(item) === OfferStatus.Expired) return null;

        return (
            <Pressable key={item.id} onPress={() => onPressOffer(item)} >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.status}>{getOfferExpirationStatus(item)}</Text>
                <Text style={styles.chevron}>›</Text>
                <View style={styles.divider} />
            </Pressable>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your Offers</Text>
            <FlatList
                testID="offer-list"
                data={offers}
                renderItem={renderOfferItem}
                keyExtractor={(item) => `offer-${item.id}`}
                refreshing={isRefreshing}
                onRefresh={onRefresh}
            />
         </View>
    );
};