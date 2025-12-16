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
        color: '#e01313',
        fontWeight: 'bold',
        fontSize: 20,
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

    featureRow: {
        flexDirection: "row",
        justifyContent: 'center',
        gap: 40,
        marginTop: 10,
    },

    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },

    icons: {
        width: 20,
        height: 20,
        tintColor: "#000000",
    },

    iconsText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#000000",
    },
});


