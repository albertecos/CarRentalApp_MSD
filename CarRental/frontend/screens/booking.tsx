import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarCards from "../components/cards/carCards";

const Booking: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View>
            <CarCards />
        </View>
    )
};

export default Booking;
