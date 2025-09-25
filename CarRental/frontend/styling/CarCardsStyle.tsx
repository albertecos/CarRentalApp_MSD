import {StyleSheet} from "react-native";

export const flexContainer = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export const outerBox = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)',
        width: '70%',
        margin: "auto",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
});

export const texting = StyleSheet.create({
    container: {
        color: "rgba(12,113,122,0.46)",
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
});