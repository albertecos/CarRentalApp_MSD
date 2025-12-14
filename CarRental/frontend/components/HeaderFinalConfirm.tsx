import {Pressable, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {confStyles} from "../screens/Confirmation";

type HeaderFinalConfirmProps = {
    title?: string;
};

const HeaderFinalConfirm: React.FC<HeaderFinalConfirmProps> = ({title}) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {height: insets.top + 62, paddingTop: insets.top, paddingBottom: 16}]}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};


export default HeaderFinalConfirm;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(205,204,205,0.5)",
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color: "#000",
        fontSize: 32,
        fontWeight: "700",
    },
    backButton: {
        position: "absolute",
        left: 16,
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
});