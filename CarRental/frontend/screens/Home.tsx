import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Alert, ScrollView,
} from "react-native";
import Header from "../components/Header";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchBooking from "../components/SearchBooking";
import {useNavigation} from "@react-navigation/native";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../components/BottomNav";
import CarMapView from "../components/CarMapView";
import {scrollingStyling} from "../styling/scrollingStyling";

type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;


const Home: React.FC = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.root} edges={["left", "right"]}>
            <Header/>
            <ScrollView style={{flex: 1}} contentContainerStyle={[scrollingStyling.scrollContent, {flexGrow: 1}]}>
                <SearchBooking/>
                <CarMapView type="small"/>
            </ScrollView>
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
