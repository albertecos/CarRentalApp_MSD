import { StyleSheet } from "react-native";

export const bookingDetailsStyle = StyleSheet.create({

    confirmText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    }, disabledSection: {
        opacity: 0.45,
    },

    confirmButton: {
        marginTop: 40,
        backgroundColor: "#D32F2F",
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },

    section: {
        marginHorizontal: 10,
        marginBottom: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
    },

    input: {
        height: 30,
        borderRadius: 10,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 10,
    },


});