import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../components/Header";
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ConfirmationCard from "../components/cards/ConfirmationCard";
import React from "react";
import Confirmation, {confStyles} from "./Confirmation";
import {Booking, Car} from "../../backend/models";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackParamList, UserBookingsStackParamList} from "../components/BottomNav";
import {useNavigation} from "@react-navigation/native";
import {bookingService} from "../../backend/BookingService";
import {CarService} from "../../backend/CarService";
import BookHeader from "../components/BookHeader";
import HeaderFinalConfirm from "../components/HeaderFinalConfirm";
import BookingProgress from "../components/BookingProgress";


type FinalConfirmProps = NativeStackScreenProps<HomeStackParamList, 'FinalConfirm'>;


const FinalConfirm: React.FC<FinalConfirmProps> = ({route, navigation}) => {

    const [booking, setBooking] = React.useState<Booking | null>(null)
    const [car, setCar] = React.useState<Car | null>(null)

    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    const {bookingId} = route.params;

    React.useEffect(() => {
        let isMount = true;

        (async () => {
            try {
                const b: Booking | null = await bookingService.getBookById(bookingId);
                if (!isMount || !b) {
                    setError("Booking not found");
                    return;
                }
                setBooking(b);

                const carService = await CarService.getInstance();
                const foundCar = carService.getCarById(b.carId);
                if (!isMount || !foundCar) {
                    setError("Car not found");
                    return;
                }
                setCar(foundCar);

            } catch (e: any) {
                if (isMount) setError("error");
            } finally {
                if (isMount) setLoading(false);
            }
        })();

        return () => {
            isMount = false;
        };
    }, [bookingId]);

    if (loading) {
        return (
            <SafeAreaView style={{flex: 1}} edges={["left", "right", "bottom"]}>
                <HeaderFinalConfirm title={"Confirmation"}/>

                <View style={confStyles.backButton}>
                    <Pressable
                        style={confStyles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-circle-outline" size={70} color="#7E7D7E80"/>
                    </Pressable>
                </View>
                <View style={confStyles.noBookingContainer}>
                    <ActivityIndicator
                        style={{
                            alignSelf: "center",
                            paddingTop: 100,
                        }}
                        size="large"
                    />
                    <Text style={confStyles.h1}>Loading you booking</Text>
                </View>

            </SafeAreaView>
        );
    }

    if (error || !booking) {
        return (
            <SafeAreaView style={{flex: 1}} edges={["left", "right", "bottom"]}>
                <HeaderFinalConfirm title={"Confirmation"}/>

                <View style={confStyles.backButton}>
                    <Pressable
                        style={confStyles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-circle-outline" size={70} color="#7E7D7E80"/>
                    </Pressable>
                </View>
                <View style={confStyles.noBookingContainer}>
                    <View style={confStyles.emptyState}>
                        <Text style={confStyles.emptyTitle}>
                            {error ?? 'Could not load booking'}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (

        <SafeAreaView style={{flex: 1}} edges={["left", "right"]}>
            <HeaderFinalConfirm title={"Confirmation"}/>
            <BookingProgress currentStep={"confirmation"}/>

            <ScrollView style={{flex: 1}} contentContainerStyle={[styles.scrollContent, {flexGrow: 1}]}>
                <ConfirmationCard booking={booking} car={car}/>
                <View style={styles.doneWrapper}>
                    <TouchableOpacity
                        style={styles.doneButton}
                        onPress={() => navigation.popToTop()}>
                        <Text style={styles.buttonText}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default FinalConfirm;

export const styles = StyleSheet.create({
    scrollContent: {
        padding: 16,
        paddingBottom: 76
    },
    doneWrapper: {
        alignItems: "flex-end",
        marginTop: 16,
    },
    doneButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#BA181B",
        borderRadius: 7,
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 44,
        shadowColor: "#000000",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        alignSelf: "center",
    },
})