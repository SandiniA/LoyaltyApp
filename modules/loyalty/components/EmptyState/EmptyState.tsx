import { Pressable, Text, View } from "react-native";
import { styles } from "./EmptyState.styled";

type EmptyStateProps = {
    title: string;
};

export const EmptyState = ({ title }: EmptyStateProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};
