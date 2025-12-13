import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {HomeStackParamList, SearchStackParamList} from "../BottomNav";
import {
    carCardStyles
} from "../../styling/CardStyles/CarCardsStyle";
import { Car, BookingSearch } from "../../../backend/models";

type NavigationProp = NativeStackNavigationProp<SearchStackParamList, 'Booking'>

type props = {
    car: Car;
    bookingSearch: BookingSearch;
}

const CarCards: React.FC<props> = ({ car }) => {
    const navigation = useNavigation<NavigationProp>();

    const handleNavigateToBookingDetails = () => {
        navigation.navigate('BookingDetails', {
            carId: car.id,
            startDate: '{bookingSearch.startDate}',
            endDate: '{bookingSearch.endDate}'
        });
    };

    return (
        <View style={carCardStyles.flexContainer}>
            <Image source={{uri: car.imageUrl}} style={carCardStyles.imageLogo}/>
            <View style={carCardStyles.infoContainer}>
                <Text style={carCardStyles.brandFont}> {car.brand + " " + car.model} {car.year}</Text>
                <Text style={carCardStyles.normalFont}>{car.description}</Text>
            </View>
            <View style={carCardStyles.priceContainer}>

                <Text style={carCardStyles.priceFont}>Price for booking</Text>
                <Text style={carCardStyles.dailyPriceFont}>{car.pricePerDay}DKK / daily</Text>
                <Text style={carCardStyles.priceFont}>Total: 2000DKK (6 days)</Text>
                <TouchableOpacity style={carCardStyles.button} onPress={handleNavigateToBookingDetails}>
                    <Text style={carCardStyles.buttonFont}>Check offer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default CarCards;

