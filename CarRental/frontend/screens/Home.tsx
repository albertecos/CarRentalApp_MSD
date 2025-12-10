import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { API_BASE_URL } from "@env";
import CarCards from "../components/cards/CarCards";
import { Car } from "../../backend/models";

const Home: React.FC = () => {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState<any>(null);
    const [car, setCar] = useState<Car | null>(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/cars`, { timeout: 5000 })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setCar(res.data[0]); // just show the first car
                } else {
                    console.log("No cars found in response:", res.data);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch cars:", error.message);
                Alert.alert("Error", "Could not fetch cars from server");
            });
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission denied", "Allow the app to use location services");
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Near you</Text>

            {/* Show one CarCard only if car exists */}
            {car && <CarCards car={car} />}

            <TextInput
                style={styles.searchBar}
                value={search}
                onChangeText={setSearch}
                placeholder="Search for car"
            />

            <Text style={styles.subHeader}>Find a car on the map</Text>

            <MapView
                style={styles.map}
                showsUserLocation={true}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    searchBar: {
        height: 45,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    header: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 22,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
    },
    map: {
        width: "100%",
        height: "50%",
        borderRadius: 20,
        borderWidth: 1,
        flex: 0.5,
        marginVertical: 10,
    },
});
