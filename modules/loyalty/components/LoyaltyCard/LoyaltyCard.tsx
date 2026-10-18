import { Text, View } from "react-native";
import { Member } from "../../types/types";
import { styles } from "./LoyaltyCard.styled";

export const LoyaltyCard = ({ member }: { member: Member }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.points}>Points: {member.points}</Text>
            <Text style={styles.tier}>Tier: {member.tier}</Text>
        </View>
    );
};