import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView} from "react-native";
import {bookingService} from "../../backend/BookingService";
import {CarService} from '../../backend/CarService';
import {Booking, Car, TempBooking} from '../../backend/models';
import {SafeAreaView} from "react-native-safe-area-context";
import {UseUserContext} from "../../UserContext";
import {StackScreenProps} from "@react-navigation/stack";
import {MapStackParamList} from "../components/BottomNav";
import BookHeader from "../components/BookHeader";
import BookingProgress from "../components/BookingProgress";

type PaymentProps = StackScreenProps<MapStackParamList, 'Payment'>;

const Payment: React.FC<PaymentProps> = ({route, navigation}) => {
    const {booking} = route.params;
    const [car, setCar] = React.useState<Car | null>(null);

    const handleConfirm = async () => {
        const updatedBooking: TempBooking = {
            ...booking,
            payMethod: selectedMethod ?? "With money",
        }
        let newBooking: Booking = await bookingService.createBooking(updatedBooking);

        navigation.navigate('FinalConfirm', {bookingId: newBooking.id});
    }
    const [saveCard, setSaveCard] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<"Card" | "Cash" | null>(null);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    React.useEffect(() => {
        async function fetchCar() {
            let carService = await CarService.getInstance();
            let fetchedCar = carService.getCarById(booking.carId);
            setCar(fetchedCar ?? null);
        }

        fetchCar();
    }, [booking.carId]);


    // let dayCost = car?.pricePerDay || 0;
    // let totalCost = dayCost * ( (new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 3600 * 24) );
    //
    // // Format date range to dd/mm - dd/mm/yyyy
    // let toFromDateStr = `${new Date(booking.startDate).getDate()}/${new Date(booking.startDate).getMonth() + 1} - ${new Date(booking.endDate).getDate()}/${new Date(booking.endDate).getMonth() + 1}/${new Date(booking.endDate).getFullYear()}`;
    //
    // const uri = car?.imageUrl || 'https://via.placeholder.com/150';


    //Need to figure this part out LOL


    const isFormValid = () => {
        if (!selectedMethod) return false;

        // If paying by cash, always valid
        if (selectedMethod === "Cash") return true;

        // If paying by card, all fields required
        return (
            cardName.trim() !== "" &&
            cardNumber.trim() !== "" &&
            expiry.trim() !== "" &&
            cvc.trim() !== ""
        );
    };

    const formValid = isFormValid();

    return (
        <SafeAreaView edges={["left", "right", "bottom"]}>
            <BookHeader title={"Payment"} navigation={navigation} />
            <BookingProgress currentStep={"payment"}/>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Select payment method</Text>

                {/* CARD SECTION */}
                <View
                    style={[
                        styles.section,
                        selectedMethod === "Cash" ? styles.disabledSection : null
                    ]}
                >
                    <View style={styles.switchRow}>
                        <Switch
                            value={selectedMethod === "Card"}
                            onValueChange={() => {
                                if (selectedMethod === "Card") {
                                    setSelectedMethod(null);     // allow turning off
                                } else {
                                    setSelectedMethod("Card");
                                }
                            }}
                            disabled={selectedMethod === "Cash"}
                        />
                        <Text
                            style={[
                                styles.sectionTitle,
                                selectedMethod === "Cash" ? styles.disabledText : null
                            ]}
                        >
                            Credit/Debit Card
                        </Text>
                    </View>

                    {/* Card Inputs (disabled when cash is selected) */}
                    <TextInput
                        style={[
                            styles.input,
                            selectedMethod === "Cash" ? styles.inputDisabled : null
                        ]}
                        placeholder="Name on card"
                        value={cardName}
                        onChangeText={setCardName}
                        editable={selectedMethod === "Card"}
                    />

                    <TextInput
                        style={[
                            styles.input,
                            selectedMethod === "Cash" ? styles.inputDisabled : null
                        ]}
                        placeholder="Card Number"
                        keyboardType="numeric"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        editable={selectedMethod === "Card"}
                    />

                    <View style={styles.row}>
                        <TextInput
                            style={[
                                styles.input,
                                styles.half,
                                selectedMethod === "Cash" ? styles.inputDisabled : null
                            ]}
                            placeholder="Expiration Date"
                            value={expiry}
                            onChangeText={setExpiry}
                            editable={selectedMethod === "Card"}
                        />

                        <TextInput
                            style={[
                                styles.input,
                                styles.half,
                                selectedMethod === "Cash" ? styles.inputDisabled : null
                            ]}
                            placeholder="CVC"
                            keyboardType="numeric"
                            value={cvc}
                            onChangeText={setCvc}
                            editable={selectedMethod === "Card"}
                        />
                    </View>

                    {/* Save card toggle */}
                    <View style={styles.switchRow}>
                        <Switch
                            value={saveCard}
                            onValueChange={setSaveCard}
                            disabled={selectedMethod === "Cash"}
                        />
                        <Text
                            style={[
                                styles.switchLabel,
                                selectedMethod === "Cash" ? styles.disabledText : null
                            ]}
                        >
                            Save card information
                        </Text>
                    </View>
                </View>

                {/* CASH SECTION */}
                <View
                    style={[
                        styles.section,
                        selectedMethod === "Card" ? styles.disabledSection : null
                    ]}
                >
                    <View style={styles.switchRow}>
                        <Switch
                            value={selectedMethod === "Cash"}
                            onValueChange={() => {
                                if (selectedMethod === "Cash") {
                                    setSelectedMethod(null);     // allow turning off
                                } else {
                                    setSelectedMethod("Cash");
                                }
                            }}
                            disabled={selectedMethod === "Card"}
                        />
                        <Text
                            style={[
                                styles.sectionTitle,
                                selectedMethod === "Card" ? styles.disabledText : null
                            ]}
                        >
                            Cash
                        </Text>
                    </View>

                    <View style={styles.switchRow}>
                        <Text
                            style={[
                                styles.switchLabel,
                                selectedMethod === "Card" ? styles.disabledText : null
                            ]}
                        >
                            Pay with cash when picking up the car
                        </Text>
                    </View>
                </View>

                {/* CONFIRM BUTTON */}
                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        !isFormValid() ? {opacity: 0.5} : null
                    ]}
                    disabled={!isFormValid()}
                    onPress={handleConfirm}
                >
                    <Text style={styles.confirmText}>Confirm booking</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Payment

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },

    heading: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
    },

    section: {
        borderTopWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
    },

    input: {
        backgroundColor: "#F4F4F4",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    half: {
        width: "48%",
    },

    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },

    switchLabel: {
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },

    confirmButton: {
        marginTop: 40,
        backgroundColor: "#D32F2F",
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },

    confirmText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    }, disabledSection: {
        opacity: 0.45,
    },

    disabledText: {
        color: "#999",
    },

    inputDisabled: {
        backgroundColor: "#e6e6e6",
    },
});
