import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Alert,
} from "react-native";
import * as Location from 'expo-location';
import Header from "../components/Header";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchBooking from "../components/SearchBooking";
import {useNavigation} from "@react-navigation/native";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../components/BottomNav";

type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;


const Home: React.FC = () => {
    const navigation = useNavigation();
    const [location, setLocation] = React.useState<any>();

        useEffect(() => {
            (async () => {
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert(
                        'Permission denied',
                        'Allow the app to use location services',
                        [{text: 'OK'}]
                    );
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation.coords);
            })();
        }, []);

    return (
        <SafeAreaView style={styles.root} edges={["left", "right", "bottom"]}>
            <Header/>
            <SearchBooking />
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
