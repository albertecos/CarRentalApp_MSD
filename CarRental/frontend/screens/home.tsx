import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import * as Location from 'expo-location';



const Home: React.FC = () => {
    const [search, setSearch] = React.useState('')
    const carCardImage = require("../assets/Car images/Hyundai_Kona_(2022).png");
    const [location, setLocation] = useState<any>(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission denied',
                    'Allow the app to use location services',
                    [{ text: 'OK' }]
                );
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        })();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Near you
            </Text>

            {/*Under is the card for nearest deal*/}
            <View style={styles.textContainer}>
                {/*Insert an image of car*/}

                <Text style={styles.carModel}>Hyundai Kona</Text>
                <Image source={carCardImage} style={{ width: 150, height: 100, resizeMode: "contain", borderRadius: 20,}}/>
                <Text style={styles.carPrice}>67.99/day</Text>

                <TouchableOpacity style={styles.smallButtonContainer} onPress={() => {}}>
                    <Text style={styles.smallButtonText}>
                        VIEW
                    </Text>
                </TouchableOpacity>
            </View>
            {/*Search Bar*/}
            <TextInput
                style={styles.searchBar}
                value={search}
                onChangeText={setSearch}
                placeholder="Search for car"

            />
            <Text style={styles.subHeader}>
                Find a car on the map
            </Text>



            {/*Figure out how to make a map*/}
            <MapView
                style={styles.map}
                showsUserLocation={true}

            />


        </View>
    )
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
        verticalAlign: "top",
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
    carModel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    carPrice: {
        fontSize: 16,
        color: "#000000",
        marginTop: 5,
        fontWeight: "bold",
        textAlign: "right",
        marginRight: 25,
    },
    textContainer: {
        // flex: 1, makes the text container take up all the remaining space (Grows with the View)
        paddingLeft: 10,
        justifyContent: "center",
        backgroundColor: "#48a2ff",
        borderWidth: 1,
        borderRadius: 20,
        shadowColor: "#222020",
        shadowRadius: 10,
        marginBottom: 70,

    },
    smallButtonText: {
        fontSize: 15,
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "bold",
    },
    smallButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#30588c",
        borderRadius: 20,
        borderWidth: 1,
        height: 30,
        marginHorizontal: 70,
        marginBottom: 10,
    },
    map: {
        width: '100%',
        height: '50%',
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        marginVertical: 10,
    },
})
