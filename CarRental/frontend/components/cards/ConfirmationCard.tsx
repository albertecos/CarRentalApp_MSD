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
                        </View>
                    </View>
                </View>
            </View>
            <View style={{height: 24}}/>
        </View>
    );
};

export default ConfirmationCard;
