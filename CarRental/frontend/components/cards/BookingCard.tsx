import {Text, View, StyleSheet, Pressable, Image} from "react-native";
import {Booking, Car} from "../../../backend/models";
import {Feather} from "@expo/vector-icons";
import {
    cardStyles
} from "../../styling/CardStyles/baseCardsStyle";

type Props = {
    booking: Booking;
    car: Car;
    onPress: () => void;
}

const BookingCard: React.FC<Props> = ({
                                          booking,
                                          onPress,
                                          car,
                                      }) => {

    const shortBookingId = booking.id.slice(0, 6);
    return (
        <Pressable onPress={onPress} style={cardStyles.card}>
            <Image source={{uri: car.imageUrl}} style={cardStyles.image} resizeMode={"cover"}/>

            <View style={cardStyles.content}>
                <Text style={cardStyles.title}>
                    Booking - {car.model} ({car.year})
                </Text>

            <View style={cardStyles.bottomRow}>
                <View style={cardStyles.leftCol}>

                    <Text style={cardStyles.metaLine}>
                        <Text style={cardStyles.metaLabel}>Booking ID: </Text>
                        <Text style={cardStyles.metaLabel}>#{shortBookingId}</Text>
                    </Text>

                    <Text style={cardStyles.metaLine}>
                        <Text style={cardStyles.metaLabel}>Pickup date: </Text>
                        <Text style={cardStyles.metaLabel}>{booking.startDate}</Text>
                    </Text>
                </View>

                <View style={cardStyles.rightCol}>
                    <Feather name="map-pin" size={18} color="#9A9A9A"/>
                    <Text style={cardStyles.locationText}>{booking.pickUpLocation}</Text>
                </View>

            </View>
            </View>
        </Pressable>
    );
};

export default BookingCard;