import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {bookingService} from "../../backend/BookingService";
import {CarService } from '../../backend/CarService';
import { Booking, Car } from '../../backend/models';
import {SafeAreaView} from "react-native-safe-area-context";
import {UseUserContext} from "../../UserContext";
import {StackScreenProps} from "@react-navigation/stack";
import BookingDetails from "./BookingDetails";
import {SearchStackParamList} from "../components/BottomNav";

type PaymentProps = StackScreenProps<SearchStackParamList, 'Payment'>;

const Payment: React.FC<PaymentProps> = ({ route, navigation }) => {
    const { carId, startDate, endDate } = route.params ?? {};
    const [car, setCar] = React.useState<Car | null>(null);
    const {user} = UseUserContext();

    const handleConfirm = async () => {
        let newBooking: Booking = await bookingService.createBooking({
            userId: user?.id ?? "",
            carId: carId,
            startDate: startDate,
            endDate: endDate,
            totalCost: totalCost,
        });
        navigation.navigate('Confirmation', {bookingId: newBooking.id});
    }
    const [saveCard, setSaveCard] = useState(false);
    const [useCash, setUseCash] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<"card" | "cash" | null>(null);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    React.useEffect(() => {
        async function fetchCar() {
            let carService = await CarService.getInstance();
            let fetchedCar = carService.getCarById(carId);
            setCar(fetchedCar ?? null);
        }
        fetchCar();
    }, [carId]);


    let dayCost = car?.pricePerDay || 0;
    let totalCost = dayCost * ( (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24) );

    // Format date range to dd/mm - dd/mm/yyyy
    let toFromDateStr = `${new Date(startDate).getDate()}/${new Date(startDate).getMonth() + 1} - ${new Date(endDate).getDate()}/${new Date(endDate).getMonth() + 1}/${new Date(endDate).getFullYear()}`;

    const uri = car?.imageUrl || 'https://via.placeholder.com/150';


         //Need to figure this part out LOL


    const isFormValid = () => {
        if (!selectedMethod) return false;

        // If paying by cash, always valid
        if (selectedMethod === "cash") return true;

        // If paying by card, all fields required
        return (
            cardName.trim() !== "" &&
            cardNumber.trim() !== "" &&
            expiry.trim() !== "" &&
            cvc.trim() !== ""
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select payment method</Text>

            {/* CARD SECTION */}
            <View
                style={[
                    styles.section,
                    selectedMethod === "cash" ? styles.disabledSection : null
                ]}
            >
                <View style={styles.switchRow}>
                    <Switch
                        value={selectedMethod === "card"}
                        onValueChange={() => {
                            if (selectedMethod === "card") {
                                setSelectedMethod(null);     // allow turning off
                            } else {
                                setSelectedMethod("card");
                            }
                        }}
                        disabled={selectedMethod === "cash"}
                    />
                    <Text
                        style={[
                            styles.sectionTitle,
                            selectedMethod === "cash" ? styles.disabledText : null
                        ]}
                    >
                        Credit/Debit Card
                    </Text>
                </View>

                {/* Card Inputs (disabled when cash is selected) */}
                <TextInput
                    style={[
                        styles.input,
                        selectedMethod === "cash" ? styles.inputDisabled : null
                    ]}
                    placeholder="Name on card"
                    value={cardName}
                    onChangeText={setCardName}
                    editable={selectedMethod === "card"}
                />

                <TextInput
                    style={[
                        styles.input,
                        selectedMethod === "cash" ? styles.inputDisabled : null
                    ]}
                    placeholder="Card Number"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    editable={selectedMethod === "card"}
                />

                <View style={styles.row}>
                    <TextInput
                        style={[
                            styles.input,
                            styles.half,
                            selectedMethod === "cash" ? styles.inputDisabled : null
                        ]}
                        placeholder="Expiration Date"
                        value={expiry}
                        onChangeText={setExpiry}
                        editable={selectedMethod === "card"}
                    />

                    <TextInput
                        style={[
                            styles.input,
                            styles.half,
                            selectedMethod === "cash" ? styles.inputDisabled : null
                        ]}
                        placeholder="CVC"
                        keyboardType="numeric"
                        value={cvc}
                        onChangeText={setCvc}
                        editable={selectedMethod === "card"}
                    />
                </View>

                {/* Save card toggle */}
                <View style={styles.switchRow}>
                    <Switch
                        value={saveCard}
                        onValueChange={setSaveCard}
                        disabled={selectedMethod === "cash"}
                    />
                    <Text
                        style={[
                            styles.switchLabel,
                            selectedMethod === "cash" ? styles.disabledText : null
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
                    selectedMethod === "card" ? styles.disabledSection : null
                ]}
            >
                <View style={styles.switchRow}>
                    <Switch
                        value={selectedMethod === "cash"}
                        onValueChange={() => {
                            if (selectedMethod === "cash") {
                                setSelectedMethod(null);     // allow turning off
                            } else {
                                setSelectedMethod("cash");
                            }
                        }}
                        disabled={selectedMethod === "card"}
                    />
                    <Text
                        style={[
                            styles.sectionTitle,
                            selectedMethod === "card" ? styles.disabledText : null
                        ]}
                    >
                        Cash
                    </Text>
                </View>

                <View style={styles.switchRow}>
                    <Text
                        style={[
                            styles.switchLabel,
                            selectedMethod === "card" ? styles.disabledText : null
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
                    !isFormValid() ? { opacity: 0.5 } : null
                ]}
                disabled={!isFormValid()}
                onPress={handleConfirm}
            >
                <Text style={styles.confirmText}>Confirm booking</Text>
            </TouchableOpacity>
        </View>
    );
};
export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
    },disabledSection: {
        opacity: 0.45,
    },

    disabledText: {
        color: "#999",
    },

    inputDisabled: {
        backgroundColor: "#e6e6e6",
    },
});
