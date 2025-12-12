import React from 'react';
import {View, Text, Image} from 'react-native';
import {confStyles} from "../../styling/ConfirmationStyles/ConfirmationCardStyling";
import {Booking, Car} from "../../../backend/models";
import BookingInfoBox from "./BookingInfoBox";

type ConfirmationProps = {
    booking: Booking;
    car: Car | null;
}


const ConfirmationCard: React.FC<ConfirmationProps> = ({booking, car}) => {
    if (!car) {
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
                        <BookingInfoBox booking={booking} car={car}/>
                    </View>
                </View>
            </View>
            <View style={{height: 24}}/>
        </View>
    );
};

export default ConfirmationCard;
