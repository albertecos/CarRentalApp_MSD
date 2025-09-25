import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
type BookingNavigationProp = StackNavigationProp<RootStackParamList, 'Booking'>;

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

const flexContainer = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const outerBox = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)',
        width: '70%',
        margin: "auto",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
});

const texting = StyleSheet.create({
    container: {
        color: "rgba(12,113,122,0.46)",
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
});