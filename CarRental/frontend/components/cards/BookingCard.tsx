import {Text, View, StyleSheet} from "react-native";
import {Booking} from "../../../backend/models";


// export type Booking = {
//     id: string;
//     userId: string;
//     carId: string;
//     startDate: string; // ISO date string
//     endDate: string;   // ISO date string
//     totalCost: number; // -1 indicates not calculated yet
//     pickUp: string;
//     delivery: string;
//     payMethod: string;
// }

type Props = {
    booking: Booking;
    onPress: () => void;

    carModel: string;
    carYear: string;
    imageUrl: string;
    pickUpLocation: string;
}

const BookingCard: React.FC<Props> = ({booking}) => {
    return (
        <View style={styles.card}>
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
        </View>
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