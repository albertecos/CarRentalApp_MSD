import {Text, View, StyleSheet, Pressable, Image} from "react-native";
import {Booking, Car} from "../../../backend/models";
import {Feather} from "@expo/vector-icons";

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
        <Pressable onPress={onPress} style={styles.card}>
            <Image source={{uri: car.imageUrl}} style={styles.image} resizeMode={"cover"}/>

            <View style={styles.content}>
                <Text style={styles.title}>
                    Booking - {car.model} ({car.year})
                </Text>
            </View>

            <View style={styles.bottomRow}>
                <View style={styles.leftCol}>

                    <Text style={styles.metaLine}>
                        <Text style={styles.metaLabel}>Booking ID: </Text>
                        <Text style={styles.metaLabel}>#{shortBookingId}</Text>
                    </Text>

                    <Text style={styles.metaLine}>
                        <Text style={styles.metaLabel}>Pickup date: </Text>
                        <Text style={styles.metaLabel}>{booking.startDate}</Text>
                    </Text>
                </View>

                <View style={styles.rightCol}>
                    <Feather name="map-pin" size={18} color="#9A9A9A"/>
                    <Text style={styles.locationText}>{booking.pickUpLocation}</Text>
                </View>

            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginVertical: 10,
        marginHorizontal: 16,

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 3,

        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 110,
    },
    content: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111",
        marginBottom: 6,
    },
    bottomRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    leftCol: {
        flex: 1,
        paddingRight: 10,
    },
    metaLine: {
        marginTop: 2,
    },
    metaLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#B8B8B8",
    },
    rightCol: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    locationText: {
        fontSize: 12.5,
        fontWeight: "700",
        color: "#B8B8B8",
    },
});

export default BookingCard;