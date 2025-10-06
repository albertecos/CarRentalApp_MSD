import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SearchStackParamList} from "../../../App";
type BookingNavigationProp = NativeStackNavigationProp<SearchStackParamList, 'Booking'>
import {
    flexContainer, infoContainer, priceContainer, brandFont, normalFont,
    imageLogo, priceFont, button, buttonFont, dailyPriceFont
} from "../../styling/CarCardsStyle";

type CarType = {
    id: string,
    brand: string,
    model: string,
    year: number,
    pricePerDay: number,
    available: boolean,
    imageUrl: string,
    description: string,
}

type carProps = {
    car: CarType;
}

const CarCards: React.FC<carProps> = ({ car }) => {
    const navigation = useNavigation<BookingNavigationProp>();

    const handleNavigateToBookingDetails = () => {
        navigation.navigate('BookingDetails', {
            carId: car.id,
            startDate: '2025-09-25',
            endDate: '2025-09-28'
        });
    };

    return (
        <View style={flexContainer.container}>
            <Image source={{uri: car.imageUrl}} style={imageLogo.container}/>
            <View style={infoContainer.container}>
                <Text style={brandFont.container}> {car.brand + " " + car.model} {car.year}</Text>
                <Text style={normalFont.container}>{car.description}</Text>
            </View>
            <View style={priceContainer.container}>

                <Text style={priceFont.container}>Price for booking</Text>
                <Text style={dailyPriceFont.container}>{car.pricePerDay}DKK / daily</Text>
                <Text style={priceFont.container}>Total: 2000DKK (6 days)</Text>
                <TouchableOpacity style={button.container} onPress={handleNavigateToBookingDetails}>
                    <Text style={buttonFont.container}>Check offer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default CarCards;

