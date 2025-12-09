import React, {useEffect} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Button} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import Header from "../components/Header";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home: React.FC = () => {
    const [search, setSearch] = React.useState('')
    const [location, setLocation] = React.useState<any>();
    const carCardImage = require("../assets/Car images/Hyundai_Kona_(2022).png");

/*
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

 */

    return (
        <SafeAreaView style={styles.root} edges={["left", "right", "bottom"]}>
            <Header/>

            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Rental: Pick up point..."
                        placeholderTextColor="#00000080"
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Return: Pick up point..."
                        placeholderTextColor="#00000080"
                    />
                </View>
                <View style={styles.dateInput}>
                    <View style={[styles.inputBox, styles.half]}>
                        <Ionicons name="calendar-outline" color="#00000080" style={styles.icon} />
                        <TextInput
                            style={styles.fieldInput}
                            placeholder="From"
                            placeholderTextColor="#00000080"
                        />
                    </View>
                    <View style={[styles.inputBox, styles.half]}>
                        <Ionicons name="calendar-outline" color="#00000080" style={styles.icon} />
                        <TextInput
                            style={styles.fieldInput}
                            placeholder="To"
                            placeholderTextColor="#00000080"
                        />
                    </View>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Age of driver"
                        placeholderTextColor="#00000080"
                    />
                </View>
                <TouchableOpacity style={styles.searchButton} onPress={carCardImage}>
                    <Text style={styles.searchButtonText}>
                        Search booking
                    </Text>
                </TouchableOpacity>
                <View style={styles.separator}/>
            </View>
        </SafeAreaView>
    )
};

export default Home;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
        gap: 12
    },
    inputBox:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e1dfe0",
        borderRadius: 7,
        paddingHorizontal: 16,
        height: 44
    },
    fieldInput:{
        flex: 1,
        fontSize: 18,
        color: "#444"
    },
    dateInput:{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10
    },
    half: {
        flex: 1,
    },
    icon:{
        fontSize: 30,
        marginRight: 16
    },
    searchButton:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#BA181B",
        borderRadius: 7,
        paddingHorizontal: 16,
        height: 44,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
    searchButtonText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        alignSelf: "center",
    },
    separator:{
        height: 2,
        backgroundColor: "#7E7D7E80",
        width: "90%",
        alignSelf: "center",
        marginVertical: 16,
    }
})
