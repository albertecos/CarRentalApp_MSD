import {StyleSheet} from "react-native";

export const imageLogo = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 20,
        padding: 5,
    }
})

export const flexContainer = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10,
        borderRadius: 20,
    },
});

export const infoContainer = StyleSheet.create({
    container: {
        width: '38%',
        margin: "auto",
        alignItems: 'baseline',
    },
});

export const priceContainer = StyleSheet.create({
    container: {
        width: '45%',
        margin: "auto",
        alignItems: 'flex-end',
        paddingRight: 20,
    },
});

export const normalFont = StyleSheet.create({
    container: {
        color: "rgba(0,0,0,0.46)",
        fontWeight: 'medium',
    },
});

export const brandFont = StyleSheet.create({
    container: {
        color: "rgba(102,7,8,1)",
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export const buttonFont = StyleSheet.create({
    container: {
        color: "rgb(255,255,255)",
        fontWeight: 'bold',
    },
});

export const priceFont = StyleSheet.create({
    container: {
        color: "rgba(0,0,0,0.7)",
        fontWeight: 'medium',
        fontSize: 12,
    },
});

export const dailyPriceFont = StyleSheet.create({
    container: {
        color: "rgb(0,0,0)",
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export const button = StyleSheet.create({
    container: {
        backgroundColor: "rgb(102,7,8)",
        borderWidth: 1,
        width: '100%',
        marginTop: 5,
        fontWeight: 'bold',
        alignItems: "center",
        padding: 7,
        borderRadius: 10,
        borderColor: "rgb(102,7,8)",
    },
});
