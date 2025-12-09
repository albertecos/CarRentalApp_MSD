import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    shadowWrapper:{
        width:'100%',
        shadowColor:"E1E1E1",
        shadowOffset: { width:0, height:4 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 6,
    },
    container: {
        width: '100%',
        paddingHorizontal: 24,
        justifyContent: "flex-end",
    },
    logoText: {
        color: "white",
        fontSize: 32,
        fontWeight: "700",
    }
})