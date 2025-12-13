import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Alert,
} from "react-native";
import Header from "../components/Header";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchBooking from "../components/SearchBooking";
import {useNavigation} from "@react-navigation/native";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../components/BottomNav";
import CarMapView from "../components/CarMapView";

type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;


const Home: React.FC = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.root} edges={["left", "right", "bottom"]}>
            <Header/>
            <SearchBooking />
            <CarMapView type="small"/>
        </SafeAreaView>
    )
};

export default Home;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    }
})
