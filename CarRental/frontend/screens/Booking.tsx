import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {bookingService} from "../../backend/BookingService";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SearchStackParamList} from "../../App";

type stackNav = NativeStackNavigationProp<SearchStackParamList, 'Booking'>

const Booking: React.FC = () => {
    const navigation = useNavigation<stackNav>();

    React.useEffect(() => {
        async function makeBooking() {
            const created = await bookingService.createBooking({
                userId: "user1",
                carId: "1",
                startDate: "2025-09-25",
                endDate: "2025-09-28",
                totalCost: 300,
            });
            // navigation.navigate('Confirmation', {bookingId: created.id});
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
            <Pressable style={styles.button} onPress={handleNavigateToBookingDetails}>
                <Text>Go to Booking Details</Text>
            </Pressable>
        </View>
    )
};

export default Booking;

const styles = StyleSheet.create({
    button: {
        marginTop: 35,
        position: 'absolute',
        verticalAlign: 'top',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        paddingBlock: 15,
        paddingInline: 35,
        alignSelf: 'center',
    }
})