import {StyleSheet} from "react-native";

export const carCardStyles = StyleSheet.create({
    imageLogo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        borderRadius: 20,
        padding: 5,
    },

    flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 10,
        margin: 10,
        borderRadius: 20,
    },

    infoContainer: {
        width: '38%',
        margin: "auto",
        alignItems: 'baseline',
    },

    priceContainer: {
        width: '45%',
        margin: "auto",
        alignItems: 'flex-end',
        paddingRight: 20,
    },

    normalFont: {
        color: "rgba(0,0,0,0.46)",
        fontWeight: 'medium',
    },

    brandFont: {
        color: "rgba(102,7,8,1)",
        fontWeight: 'bold',
        fontSize: 15,
    },

    buttonFont: {
        color: "rgb(255,255,255)",
        fontWeight: 'bold',
    },

    priceFont: {
        color: "rgba(0,0,0,0.7)",
        fontWeight: 'medium',
        fontSize: 12,
    },

    dailyPriceFont: {
        color: "rgb(0,0,0)",
        fontWeight: 'bold',
        fontSize: 20,
    },

    button: {
        backgroundColor: "rgb(102,7,8)",
        borderWidth: 1,
        width: '100%',
        marginTop: 5,
        fontWeight: 'bold',
        alignItems: "center",
        padding: 7,
        borderRadius: 10,
        borderColor: "rgb(102,7,8)",
    }
});


