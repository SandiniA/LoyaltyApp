import { Modal, Pressable, Text, View } from "react-native";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { styles } from "./RedeemOfferModal.styled";


type RedeemOfferModalProps = {
    isVisible: boolean;
    onClose: () => void;
    offerTitle: string;
};

export const RedeemOfferModal = ({ isVisible, onClose, offerTitle }: RedeemOfferModalProps) => {
    return (
        <Modal visible={isVisible} onRequestClose={onClose} animationType="slide" transparent>
            <View style={styles.overlay}>
                <Pressable
                    style={styles.backdrop}
                    onPress={onClose}
                />
                <View style={styles.sheet}>
                    <Text style={styles.textStyle}>Your reward is ready</Text>
                    <Text style={styles.offerTitle}>{offerTitle}</Text>
                    <View style={styles.barcodeContainer}>
                        <Barcode
                            value={"123456789012"}
                            format="CODE128"
                            width={3}
                            height={90}
                            lineColor="#111827"
                            background="#FFFFFF"
                        /> 
                    </View>
                    <Text style={styles.offerTitle}>Show this barcode to the cashier</Text>   
                </View>
            </View>
        </Modal>
    )
};