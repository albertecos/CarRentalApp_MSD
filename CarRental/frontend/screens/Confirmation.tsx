import React from 'react';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import ConfirmationCard from "../components/cards/ConfirmationCard";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {SearchStackParamList, UserBookingsStackParamList} from "../components/BottomNav";
import {bookingService} from "../../backend/BookingService";
import Header from "../components/Header";
import {Booking, Car} from "../../backend/models";
import {useNavigation} from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {CarService} from "../../backend/CarService";

type ConfirmationProps = NativeStackScreenProps<UserBookingsStackParamList, 'Confirmation'>;

const Confirmation: React.FC<ConfirmationProps> = ({route}) => {
    const navigation = useNavigation();

    const {bookingId} = route.params;

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [booking, setBooking] = React.useState<Booking | null>(null)
    const [car, setCar] = React.useState<Car | null>(null)

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
            <SafeAreaView edges={["left", "right", "bottom"]}>
                <Header/>
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
            <SafeAreaView edges={["left", "right", "bottom"]}>
                <Header/>
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
                            {error ?? 'No bookings were found'}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (

        <SafeAreaView edges={["left", "right", "bottom"]}>
            <Header/>
            <ScrollView contentContainerStyle={confStyles.scrollContent}>
                <View style={confStyles.backButton}>
                    <Pressable
                        style={confStyles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-circle-outline" size={70} color="#7E7D7E80"/>
                    </Pressable>
                </View>
                <ConfirmationCard booking={booking} car={car}/>
            </ScrollView>
        </SafeAreaView>

    );
};

export default Confirmation;

export const confStyles = StyleSheet.create({
    scrollContent: {
        padding: 16,
        paddingBottom: 76
    },
    backButton: {
        width: 70,
        height:
            70,
    }
    ,
    noBookingContainer: {
        flex: 1,
        backgroundColor:
            '#fff',
    }
    ,
    emptyState: {
        flex: 1,
        alignItems:
            'center',
        justifyContent:
            'center',
        padding:
            24
    }
    ,
    emptyTitle: {
        fontSize: 20,
        fontWeight:
            'bold',
        marginBottom:
            8,
    }
    ,
    h1: {
        fontSize: 24,
        fontWeight:
            '800',
        color:
            '#0f172a',
        textAlign:
            'center'
    }
})