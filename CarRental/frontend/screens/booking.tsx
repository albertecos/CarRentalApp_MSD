import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarCards from "../components/cards/carCards";
import {normalFont} from "../styling/CarCardsStyle";
import {cars} from "../../backend/data/cars";

const Booking: React.FC = () => {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <Text style={normalFont.container}>BOOK YOUR CAR HERE</Text>
            {cars.map((car) => (
                <CarCards car={car}/>
            ))}
        </ScrollView>
    )
};

export default Booking;
