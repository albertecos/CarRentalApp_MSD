import {StyleSheet} from "react-native";

export const carCardStyles = StyleSheet.create({

    titleContainer: {
        flexShrink: 1,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },

    priceContainer: {
        alignItems: 'flex-end',
    },

    locationRow: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 2,
        gap: 6,
    },

    priceFont: {
        color: "rgba(102,7,8,1)",
        fontWeight: 'bold',
        fontSize: 15,
    },

    buttonFont: {
        color: "rgb(255,255,255)",
        fontWeight: 'bold',
    },

    dailyTextFont: {
        fontSize: 10,
        fontWeight: "700",
        color: "#B8B8B8",
    },
});


