import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
type BookingNavigationProp = StackNavigationProp<RootStackParamList, 'Booking'>;
import '../../styling/CarCardsStyle';
import {flexContainer, outerBox, texting} from "../../styling/CarCardsStyle";

const CarCards: React.FC = () => {
    const navigation = useNavigation<BookingNavigationProp>();

    const handleNavigateToBookingDetails = () => {
        navigation.navigate('BookingDetails', {
            carId: '2',
            startDate: '2025-09-25',
            endDate: '2025-09-28'
        });
    };

    return (
        <View style={flexContainer.container}>
            <View style={outerBox.container}>
                <Text style={texting.container}>BOOK THIS CAR RN</Text>
                <Button title="Go to Booking Details NOW"  onPress={handleNavigateToBookingDetails} />
            </View>
        </View>
    )
};

export default CarCards;
