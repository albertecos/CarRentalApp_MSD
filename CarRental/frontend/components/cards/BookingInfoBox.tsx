import {Text, View} from "react-native";
import {confStyles} from "../../styling/CardStyles/ConfirmationCardStyling";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {Booking, Car} from "../../../backend/models";

type Props = {
    booking: Booking,
    car: Car
}

const BookingInfoBox: React.FC<Props> = ({booking, car}) => {
    return (
        <View>
            <View style={confStyles.infoBox}>
                <View style={confStyles.infoRowHeader}>
                    <View style={confStyles.iconCol}>
                        <Ionicons name="map-outline" size={18} color="#6b7280"/>
                    </View>
                    <Text style={confStyles.infoHeaderText}>Date & Location</Text>
                </View>
                <View style={confStyles.dateRow}>
                    <View style={confStyles.dateCol}>
                        <Text style={confStyles.infoMain}>{booking.startDate}</Text>
                        <Text style={confStyles.infoMain}>{booking.pickUpLocation}</Text>
                    </View>
                    <Ionicons name="arrow-forward-outline" size={30} color="#6b7280"/>
                    <View style={confStyles.dateCol}>
                        <Text style={confStyles.infoMain}>{booking.endDate}</Text>
                        <Text style={confStyles.infoMain}>{booking.deliveryLocation}</Text>
                    </View>
                </View>

                <View style={confStyles.dividerLight}/>

                <View style={confStyles.infoRowHeader}>
                    <Ionicons name="car-outline" size={18} color="#6b7280"/>
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
                    <Text>Daily price:</Text>
                    <Text>{car.pricePerDay} DKK</Text>
                </View>

                <View style={confStyles.paymentRow}>
                    <Text>Days:</Text>
                    <Text>{rentalDays({startDate: booking.startDate, endDate: booking.endDate})} days</Text>
                </View>
                <View style={confStyles.paymentRow}>
                    <Text>Payment method:</Text>
                    <Text>{booking.payMethod}</Text>
                </View>
            </View>

            <View style={confStyles.paymentRow}>
                <Text style={confStyles.paymentTotalLabel}>Payment total</Text>
                <Text style={confStyles.paymentTotalValue}>{booking.totalCost} DKK</Text>
            </View>
        </View>
    );
};

function rentalDays({startDate, endDate}:{startDate: string, endDate: string}): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const diffDays = Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY);

    return diffDays
}

export default BookingInfoBox;