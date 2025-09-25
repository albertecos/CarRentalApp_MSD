import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type BookingNavigationProp = StackNavigationProp<RootStackParamList, 'Booking'>;

const Booking: React.FC = () => {
    const navigation = useNavigation<BookingNavigationProp>();

    const handleNavigateToBookingDetails = () => {
        navigation.navigate('BookingDetails', {
            carId: '2',
            startDate: '2025-09-25',
            endDate: '2025-09-28'
        });
    };

    return (
        <View>
            <Button title="Go to Booking Details" onPress={handleNavigateToBookingDetails} />

        </View>
    )
};

export default Booking;
