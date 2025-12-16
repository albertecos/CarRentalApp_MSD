import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginVertical: 10,
        marginHorizontal: 16,

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 3,

        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 110,
    },
    content: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111",
        marginBottom: 6,
    },
    bottomRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingRight: 4,
    },
    leftCol: {
        flex: 1,
        paddingRight: 10,
    },
    metaLine: {
        marginTop: 2,
    },
    metaLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#B8B8B8",
    },
    rightCol: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    locationText: {
        fontSize: 12.5,
        fontWeight: "700",
        color: "#B8B8B8",
    },
});
