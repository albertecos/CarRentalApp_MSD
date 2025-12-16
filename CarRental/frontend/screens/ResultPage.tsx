import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackParamList} from "../components/BottomNav";
import React, {useEffect} from "react";
import {Car} from "../../backend/models";
import Header from "../components/Header";
import SearchBooking from "../components/SearchBooking";
import {SafeAreaView} from "react-native-safe-area-context";
import axios from "axios";
import {API_BASE_URL} from "@env";
import {normalFont} from "../styling/BookingPageStyle";
import CarCards from "../components/cards/CarCards";
import Ionicons from "@expo/vector-icons/Ionicons";
import {resultPageStyling} from "../styling/ResultPageStyle";
import {scrollingStyling} from "../styling/scrollingStyling";

type ResultPageProps = NativeStackScreenProps<HomeStackParamList, 'ResultPage'>;

const ResultPage: React.FC<ResultPageProps> = ({navigation, route}) => {
    const {bookingSearch} = route.params;
    const [cars, setCars] = React.useState<Car[]>([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/cars`, {timeout: 5000}).then(
            res => {
                setCars(res.data);
            }
        ).catch(error => console.log(error));
    }, []);

    const sortedCars = cars.map(cars => cars).sort((carA, carB) => {
        const searchedLocation = bookingSearch.pickUpLocation;

        const carAMatches = carA.location.area == searchedLocation;
        const carBMatches = carB.location.area == searchedLocation;

        if (carAMatches && !carBMatches) return -1;
        if (!carAMatches && carBMatches) return 1;
        return 0
    });

    return (
        <SafeAreaView style={{flex: 1}} edges={["left", "right"]}>
            <Header/>
            <View style={resultPageStyling.containerTop}>
                <View style={resultPageStyling.backButton}>
                    <Pressable
                        style={resultPageStyling.backButton}
                        onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-circle-outline" size={70} color="#7E7D7E80"/>
                    </Pressable>
                </View>
                <Text style={normalFont.container}>Your search gave {cars.length} results</Text>
            </View>
            <ScrollView style={{flex: 1}} contentContainerStyle={[scrollingStyling.scrollContent, {flexGrow: 1}]}>
                <ScrollView>
                    {sortedCars.map((car) => (
                        <CarCards
                            key={car.id}
                            car={car}
                            bookingSearch={bookingSearch}
                        />
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ResultPage;