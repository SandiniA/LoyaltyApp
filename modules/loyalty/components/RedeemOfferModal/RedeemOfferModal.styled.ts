import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   overlay: {
      flex: 1,
      justifyContent: "flex-end",
   },
   backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
   },
   sheet: {
      height: "60%",
      padding: 20,
      backgroundColor: "#fff",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
   },
   textStyle: {
      fontSize: 18,
      fontWeight: "bold",
      paddingTop: 20,
      alignSelf: "center",
   },
   offerTitle: {
      fontSize: 16,
      color: "#666",
      paddingTop: 20,
      paddingBottom: 20,
      alignSelf: "center",
   },
   barcodeContainer: {
      alignItems: "center",
      //justifyContent: "center",
     padding: 20,
      borderRadius: 10,
      backgroundColor: "red",
   },
});
