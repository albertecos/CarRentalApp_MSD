import React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {confStyles} from "../../styling/ConfirmationStyles/ConfirmationCardStyling";
import {noConfStyles} from "../../styling/ConfirmationStyles/NoBookings";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ScrollView} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context'
import {bookingService} from '../../../backend/BookingService';
import {SearchStackParamList} from "../BottomNav";
import {Booking, Car} from "../../../backend/models";
import axios from "axios";
import {API_BASE_URL} from "@env";
import Ionicons from "@expo/vector-icons/Ionicons";
import {styles} from "../../styling/HeaderStyling";

type ConfirmationProps = {
    booking: Booking;
    car: Car | null;
}


const ConfirmationCard: React.FC<ConfirmationProps> = ({booking, car}) => {
    if(!car){
        return null;
    }
    return (
        <View style={confStyles.content}>
            <View style={confStyles.card}>
                <View style={confStyles.cardInner}>
                    <View style={confStyles.cardHeader}>
                        <Text style={confStyles.cardHeaderText}>Confirmed</Text>
                    </View>
                    <View style={confStyles.cardBody}>
                        <Text style={confStyles.h1}>Your car has been booked</Text>

                        <Image
                            source={{uri: car.imageUrl}}
                            style={confStyles.carImage}
                            resizeMode="contain"
                        />
                        <View style={confStyles.infoBox}>
                            <View style={confStyles.infoRowHeader}>
                                <Ionicons name="map-outline" size={18} color="#6b7280" />
                                <Text style={confStyles.infoHeaderText}>Date & Location</Text>
                            </View>
                            <View style={confStyles.dateRow}>
                                <View style={confStyles.dateCol}>
                                    <Text style={confStyles.infoMain}>{booking.startDate}</Text>
                                    <Text style={confStyles.infoMain}>{booking.pickUp}</Text>
                                </View>
                                <Ionicons name="arrow-forward-outline" size={30} color="#6b7280" />
                                <View style={confStyles.dateCol}>
                                    <Text style={confStyles.infoMain}>{booking.endDate}</Text>
                                    <Text style={confStyles.infoMain}>{booking.delivery}</Text>
                                </View>
                            </View>
                            <View style={confStyles.dividerLight}/>

                            <View style={confStyles.infoRowHeader}>
                                <Ionicons name="car-outline" size={18} color="#6b7280" />
                                <Text style={confStyles.infoHeaderText}>Car details</Text>
                            </View>
                            <View style={confStyles.carRow}>
                                <View>
                                    <Text style={confStyles.infoMain}>{car.brand} {car.year}</Text>
                                </View>
                                <Text style={confStyles.infoMain}>
                                    daily,{` `}
                                    <Text style={confStyles.bold}>
                                        {car.pricePerDay} DKK
                                    </Text>
                                </Text>
                            </View>
                        </View>

                        <View style={confStyles.paymentSection}>
                            <Text style={confStyles.paymentTitle}>
                                Payment info
                            </Text>

                            <View style={confStyles.paymentRow}>
                                <Text >Daily price:</Text>
                                <Text >{car.pricePerDay} DKK</Text>
                            </View>

                            <View style={confStyles.paymentRow}>
                                <Text>Days:</Text>
                                <Text>{}</Text>
                            </View>
                        </View>

                        <View style={confStyles.paymentRow}>
                            <Text style={confStyles.paymentTotalLabel}>Payment total</Text>
                            <Text style={confStyles.paymentTotalValue}>{booking.totalCost} DKK</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{height: 24}}/>
        </View>
    );
};

export default ConfirmationCard;
