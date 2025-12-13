import {Pressable, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {confStyles} from "../screens/Confirmation";

type BookHeaderProps = {
    title?: string;
    navigation: any;
};

const BookHeader: React.FC<BookHeaderProps> = ({title, navigation}) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {height: insets.top + 62, paddingTop: insets.top, paddingBottom: 16}]}>
            <Pressable
                style={[styles.backButton, {top: insets.top-12}]}
                onPress={() => navigation.goBack()}
                hitSlop={10}>
                <Ionicons name="chevron-back-circle-outline" size={70} color="#F5F5F5"/>
            </Pressable>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};


export default BookHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#7E7D7E80",
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