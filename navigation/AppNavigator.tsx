import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../modules/loyalty/screens/HomeScreen";
import { Offer } from "../modules/loyalty/types/types";
import { OfferDetailScreen } from "../modules/loyalty/screens/OfferDetailScreen";

export enum ScreenNames {
    Home = "Home",
    OfferDetail = "OfferDetail",
}

export type RootStackParamList = {
    [ScreenNames.Home]: undefined;
    [ScreenNames.OfferDetail]: { offer: Offer };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
            <Stack.Screen name={ScreenNames.OfferDetail} component={OfferDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    )
};
