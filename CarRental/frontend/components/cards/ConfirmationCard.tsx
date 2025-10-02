import React from 'react';
import {View, Text, Button, StyleSheet, Animated, Image, ActionSheetIOS, ActivityIndicator} from 'react-native';
import {ReceiptStackParamList, RootStackParamList} from "../../../App";
import { BookingService } from "../../../backend/service";
import { confStyles } from "../../styling/ConfirmationStyles/ConfirmationCardStyling";
import {noConfStyles} from "../../styling/ConfirmationStyles/NoBookings";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

const ScrollView = Animated.ScrollView;

type ConfirmationProps = NativeStackScreenProps<ReceiptStackParamList, 'Confirmation'>;

type Booking = {
    id: string;
    userId: string;
    carId: string;
    startDate: string;
    endDate: string;
    totalCost: number;
}

const API_BASE_URL = 'http://localhost:3000';

const ConfirmationCard: React.FC<ConfirmationProps> = ({ route, navigation }) => {
    const bookingId = "booking1";
    //route.params?.bookingId;
    //const booking = bookingId ? bookingService.getBookingById(bookingId) : undefined;

    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [booking, setBooking] = React.useState<Booking | null>(null);

    React.useEffect(() => {
        let isMounted = true;
        async function load() {
            if (!bookingId){
                setError('No booking id given');
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`${API_BASE_URL}/bookings/bookingId/${bookingId}`);
                if (!res.ok) {
                    const body = await res.json().catch(() => ({}));
                    throw new Error(body.error || `Failed to fetch booking: ${res.status}`);
                }
                const data: Booking = await res.json();
                if (isMounted) setBooking(data);
            } catch (e: any) {
                if (isMounted) setError(e.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        load();
        return () => { isMounted = false; };
    }, [bookingId]);

    if (loading) {
        return (
            <View style={noConfStyles.noBookingContainer}>
                <ActivityIndicator />
                <Text style={confStyles.h1}>Loading you booking</Text>
            </View>
        );
    }

    // Handle output when there is no bookings
    if (error || !booking) {
        return (
            <View style={noConfStyles.noBookingContainer}>
                <View style={noConfStyles.emptyState}>
                    <Text style={noConfStyles.emptyTitle}>
                        {error ?? 'No bookings were found'}
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <View style={confStyles.confContainer}>
            <ScrollView contentContainerStyle={confStyles.scrollContent}>
                <View style={confStyles.banner}>
                    <Text style={confStyles.brand}>CarRental</Text>
                </View>
                <View style={confStyles.card}>
                    <View style={confStyles.cardHeader}>
                        <Text style={confStyles.cardHeaderText}>Confirmed</Text>
                    </View>
                    <View style={confStyles.cardBody}>
                        <Text style={confStyles.h1}>Your car has been booked</Text>

                        <Image
                            source={require("../../assets/Car images/Citreon_C3.png")}
                            style={confStyles.carImage}
                            resizeMode="contain"
                        />

                        <View style={confStyles.section}>
                            <View style={confStyles.row}>
                                <Text style={confStyles.rowIcon}>🗓️</Text>
                                <View style={confStyles.rowTextWrap}>
                                    <Text style={confStyles.rowTitle}>
                                        From <Text style={confStyles.bold}>{booking.startDate}</Text>
                                    </Text>
                                    <Text style={confStyles.rowSub}>
                                        to <Text style={confStyles.bold}>{booking.endDate}</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={confStyles.divider}/>

                        <View style={confStyles.priceRow}>
                            <Text style={confStyles.priceLabel}>?? 100 km (100 km/day) ??</Text>
                            <Text style={confStyles.included}>included</Text>
                        </View>
                        <View style={confStyles.priceRow}>
                            <Text style={confStyles.priceLabel}>?? No insurance ??</Text>
                            <Text style={confStyles.included}>included</Text>
                        </View>

                        <View style={confStyles.dividerLight}/>

                        <View style={confStyles.priceRow}>
                            <Text style={[confStyles.priceLabel, confStyles.totalLabel]}>Total (DKK)</Text>
                            <Text style={confStyles.totalValue}>{booking.totalCost}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 24 }} />
            </ScrollView>
        </View>

    )
};

export default ConfirmationCard;
