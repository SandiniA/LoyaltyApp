import { Text, View } from "react-native";
import { LoyaltyCard } from "../components/LoyaltyCard/LoyaltyCard";
import { mockMember, mockOffers } from "../mocks/mockData";
import { OfferCard } from "../components/OfferCard/OfferCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenNames } from "../../../navigation/AppNavigator";
import { SkeletonLoader } from "../components/SkeletonLoader/SkeletonLoader";
import { ErrorState } from "../components/ErrorState/ErrorState";
import { EmptyState } from "../components/EmptyState/EmptyState";
import { LoyaltyScreen } from "./LoyaltyScreen";
import { OffersScreen } from "./OffersScreen";

type Props = NativeStackScreenProps<RootStackParamList, ScreenNames.Home>;

export const HomeScreen = ({navigation}: Props) => {

    return (
        <View>
            <LoyaltyScreen/>
            <OffersScreen />
        </View>
    );
};

