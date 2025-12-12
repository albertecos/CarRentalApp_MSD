import {Text, View, StyleSheet, Pressable} from "react-native";
import {Booking} from "../../../backend/models";

type Props = {
    booking: Booking;
    onPress: () => void;
}

const BookingCard: React.FC<Props> = ({booking, onPress}) => {
    return (
        <Pressable onPress={onPress} style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Booking #{booking.id.slice(0, 6)}</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.detail}>
                    <Text style={styles.label}>Car ID: {booking.carId}</Text>
                </Text>
                <Text style={styles.detail}>
                    <Text style={styles.label}>Dates: {booking.startDate} - {booking.endDate}</Text>
                </Text>
                <Text style={styles.detail}>
                    <Text style={styles.label}>Total cost: {booking.totalCost}</Text>
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 3,
    },
    header: {
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        marginBottom: 8,
        paddingBottom: 4,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    body: {
        marginTop: 4,
    },
    detail: {
        fontSize: 14,
        marginVertical: 2,
    },
    label: {
        fontWeight: "600",
        color: "#444",
    },
});

export default BookingCard;