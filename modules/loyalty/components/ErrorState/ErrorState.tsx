import { Button, Text, View } from "react-native";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";
import { styles } from "./ErrorState.styled";


type ErrorStateProps = {
   onRetry: () => void;
   message: string;
};

export const ErrorState = ({ onRetry, message }: ErrorStateProps) => {

    return (
        <View style= {styles.container}>
            <Text style={styles.errorText}>{message}</Text>
                <Button title="Try again" onPress={onRetry} />
        </View>
    );
};