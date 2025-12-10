import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Button,
    Pressable,
    Platform
} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import Header from "../components/Header";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import CalendarCard from "../components/cards/CalendarCard";
import SelectAgeCard from "../components/cards/SelectAgeCard";

const Home: React.FC = () => {
    const [search, setSearch] = React.useState('')
    const [location, setLocation] = React.useState<any>();
    const [showFromPicker, setShowFromPicker] = useState<boolean>(false);
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [showToPicker, setShowToPicker] = useState<boolean>(false);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [showSelectedAge, setShowSelectedAge] = React.useState<boolean>(false);
    const [selectedAge, setSelectedAge] = useState<Date | null>(null);


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

    const today = normalizeDate(new Date());

    const handleAge = (birthdate: Date) => {
        const date = normalizeDate(birthdate);
        const today = normalizeDate(new Date());

        if (date > today) {
            Alert.alert(
                "Invalid date",
                "Birth date cannot be in the future."
            );
            setSelectedAge(null);
            return;
        }

        setSelectedAge(date);
    };

    const handlePickUpDate = (date: Date) => {
        const picked = normalizeDate(date);

        if (picked < today) {
            Alert.alert(
                "Invalid date",
                "Pick-up date must be today or later."
            );
            setFromDate(null);
            return;
        }

        setFromDate(picked);

        if(toDate && normalizeDate(toDate) < picked) {
            setToDate(null);
        }
    };

    const handleDeliverDate = (date: Date) => {
        const picked = normalizeDate(date);

        if(picked < today) {
            Alert.alert(
                "Invalid date",
                "Pick-up date must be today or later."
            );
            setToDate(null);
            return;
        }

        if(fromDate && picked < normalizeDate(fromDate)) {
            Alert.alert(
                "Invalid date",
                "Delivery date cannot be earlier than the pick-up date."
            );
            setToDate(null);
            return;
        }

        setToDate(picked);
    }

    return (
        <SafeAreaView style={styles.root} edges={["left", "right", "bottom"]}>
            <Header/>

            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <Ionicons name="location-outline" color="#00000080" style={styles.icon}/>
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Pick-up point..."
                        placeholderTextColor="#00000080"
                    />
                </View>
                <View style={styles.inputBox}>
                    <Ionicons name="location-outline" color="#00000080" style={styles.icon}/>
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Delivery point..."
                        placeholderTextColor="#00000080"
                    />
                </View>
                <View style={styles.dateInput}>
                    <Pressable onPress={() => setShowFromPicker(true)} style={[styles.inputBox, styles.half]}>
                        <Ionicons name="calendar-outline" color="#00000080" style={styles.icon}/>
                        <Text style={styles.fieldInput}>
                            {fromDate ? fromDate.toLocaleDateString() : "From"}
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => setShowToPicker(true)} style={[styles.inputBox, styles.half]}>
                        <Ionicons name="calendar-outline" color="#00000080" style={styles.icon}/>
                        <Text style={styles.fieldInput}>
                            {toDate ? toDate.toLocaleDateString() : "To"}
                        </Text>
                    </Pressable>
                </View>
                <CalendarCard
                    visible={showFromPicker}
                    title={"Pick-up date"}
                    initialDate={fromDate || today}
                    minimumDate={today}
                    onConfirm={handlePickUpDate}
                    onClose={() => setShowFromPicker(false)}/>
                <CalendarCard
                    visible={showToPicker}
                    title={"Pick deliver date"}
                    initialDate={toDate || fromDate || today}
                    minimumDate={fromDate || today}
                    onConfirm={handleDeliverDate}
                    onClose={() => setShowToPicker(false)}
                />

                <Pressable onPress={() => setShowSelectedAge(true)} style={styles.inputBox}>
                    <Text style={styles.fieldInput}>
                        {selectedAge ? selectedAge.toLocaleDateString() : "Age of driver"}
                    </Text>
                </Pressable>
                <SelectAgeCard visible={showSelectedAge} onConfirm={handleAge} onClose={() => setShowSelectedAge(false)}/>

                <TouchableOpacity style={styles.searchButton} onPress={() => {
                    //TODO
                }}
                >
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

const normalizeDate = (d: Date) => {
    const copy = new Date(d);
    copy.setHours(0, 0, 0, 0);
    return copy;
}

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
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e1dfe0",
        borderRadius: 7,
        paddingHorizontal: 16,
        height: 44
    },
    fieldInput: {
        flex: 1,
        fontSize: 18,
        color: "#444"
    },
    dateInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10
    },
    half: {
        flex: 1,
    },
    icon: {
        fontSize: 30,
        marginRight: 16
    },
    searchButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#BA181B",
        borderRadius: 7,
        paddingHorizontal: 16,
        height: 44,
        shadowColor: "#000000",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
    searchButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        alignSelf: "center",
    },
    separator: {
        height: 2,
        backgroundColor: "#7E7D7E80",
        width: "90%",
        alignSelf: "center",
        marginVertical: 16,
    }
})
