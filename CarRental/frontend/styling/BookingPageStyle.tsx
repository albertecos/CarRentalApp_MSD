import { StyleSheet } from "react-native";

export const searchBar = StyleSheet.create({
    container: {
        backgroundColor: "rgba(197,197,197,0.57)",
        borderWidth: 1,
        width: '98%',
        margin: 3,
        marginVertical: 10,
        fontWeight: 'bold',
        alignItems: "center",
        padding: 7,
        borderRadius: 12,
        borderColor: "transparent",
    },
});

export const normalFont = StyleSheet.create({
    container: {
        color: "rgba(0,0,0,0.46)",
        fontWeight: 'medium',
        marginLeft: 5,
    },
});

export const titleFont = StyleSheet.create({
    container: {
        color: "rgb(102,7,8)",
        fontWeight: 'bold',
        marginTop: 60,
        marginLeft: 5,
        fontSize: 28,
        fontFamily:'MadimiOne',
    },
});