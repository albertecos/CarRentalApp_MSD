import React from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {HomeStackParamList} from "../BottomNav";
import { carCardStyles } from "../../styling/CardStyles/CarCardsStyle"; //carCards specifically
import { cardStyles } from "../../styling/CardStyles/baseCardsStyle";
import { Car, BookingSearch } from "../../../backend/models";
import {Feather} from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BookingDetails'>

type props = {
    car: Car;
    bookingSearch: BookingSearch;
}

const CarCards: React.FC<props> = ({ car, bookingSearch }) => {
    const navigation = useNavigation<NavigationProp>();

    const handleNavigateToBookingDetails = () => {
        navigation.navigate('BookingDetails', {
            carId: car.id,
            bookingSearch
        });
    };

    return (
        <Pressable onPress={handleNavigateToBookingDetails} style={cardStyles.card}>
            <Image source={{uri: car.imageUrl}} style={cardStyles.image} resizeMode={"cover"}/>

            <View style={cardStyles.content}>

                <View style={carCardStyles.headerRow}>
                    {/*Title*/}
                    <View style={carCardStyles.titleContainer}>
                        <Text style={cardStyles.title}>
                            {car.brand} {car.model} ({car.year})
                        </Text>

                        {/*Location*/}
                        <View style={carCardStyles.locationRow}>
                            <Feather name="map-pin" size={18} color="#9A9A9A"/>
                            <Text style={cardStyles.metaLabel}> {car.location}</Text>
                        </View>
                    </View>

                    {/*Price part*/}
                    <View style={carCardStyles.priceContainer}>
                        <Text style={carCardStyles.priceFont}> {car.pricePerDay} DKK </Text>
                        <Text style={carCardStyles.dailyTextFont}>/ daily</Text>
                    </View>
                </View>

                {/*MISSING: The last row with icons :,3*/}
            </View>
        </Pressable>
    )
};

export default CarCards;

