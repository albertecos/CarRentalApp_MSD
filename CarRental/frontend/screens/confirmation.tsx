import React from 'react';
import {View, Text, Button, StyleSheet, Animated, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackScreenProps } from '@react-navigation/stack';
import { BookingService } from "../../backend/service";
import { confStyles } from "../styling/ConfirmationStyles/ConfirmationCardStyling";
import { noConfStyles} from "../styling/ConfirmationStyles/NoBookings";
import ScrollView = Animated.ScrollView;

type ConfirmationProps = StackScreenProps<RootStackParamList, 'Confirmation'>;

const bookingService = BookingService.getInstance();

const Confirmation: React.FC<ConfirmationProps> = ({ route, navigation }) => {
    const { bookingId } = route.params;
    const booking = bookingService.getBookingById(bookingId);

    // Handle output when there is no bookings
    if (!booking) {
        return (
            <View style={noConfStyles.noBookingContainer}>
                <View style={noConfStyles.emptyState}>
                    <Text style={noConfStyles.emptyTitle}>
                        No bookings were found
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
                            source={require("../assets/icon.png")}
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

export default Confirmation;
