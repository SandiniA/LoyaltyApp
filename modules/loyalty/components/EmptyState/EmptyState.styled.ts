import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    actionButton: {
        marginTop: 20,
        backgroundColor: "#172554",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    actionButtonPressed: {
        opacity: 0.8,
    },
    actionButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
});
