import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList, RootTabParams} from '../../App';
import {bookingService} from "../../backend/bookingService";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";

type stackNav = NativeStackNavigationProp<RootStackParamList, 'Booking'>

type TabNav = BottomTabNavigationProp<RootTabParams>

type BookingNavigationProp = CompositeNavigationProp<stackNav, TabNav>;

const Booking: React.FC = () => {
    const navigation = useNavigation<BookingNavigationProp>();

    React.useEffect(() => {
        async function makeBooking() {
            const created = await bookingService.createBooking({
                userId: "user1",
                carId: "1",
                startDate: "2025-09-25",
                endDate: "2025-09-28",
                totalCost: 300,
            });
            navigation.navigate('Receipt', {
                screen: 'Confirmation',
                params: { bookingId: created.id},
            });
        }
        makeBooking();
    }, [navigation]);

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
