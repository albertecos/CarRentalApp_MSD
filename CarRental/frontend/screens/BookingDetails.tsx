import React from 'react';
import {View, Text, Button, Image, StyleSheet, Pressable} from 'react-native'; // Add Image here
import {HomeStackParamList, SearchStackParamList, UserBookingsStackParamList} from "../components/BottomNav";

import {CarService } from '../../backend/CarService';
import {Booking, Car, TempBooking} from '../../backend/models';
import {UseUserContext} from "../../UserContext";
import {StackScreenProps} from "@react-navigation/stack";
import BookingInfoBox from "../components/cards/BookingInfoBox";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

type BookingDetailsProps = StackScreenProps<HomeStackParamList, 'BookingDetails'>;

const BookingDetails: React.FC<BookingDetailsProps> = ({ route, navigation }) => {
  const { carId, bookingSearch } = route.params;
  const [car, setCar] = React.useState<Car | null>(null);
  const {user} = UseUserContext();

  React.useEffect(() => {
    async function fetchCar() {
      let carService = await CarService.getInstance();
      let fetchedCar = carService.getCarById(carId);
      setCar(fetchedCar ?? null);
    }
    fetchCar();
  }, [carId]);

  if (!car || !bookingSearch.endDate || !bookingSearch.startDate) {
    return (
        <View>
          <Text>WRONG NO DATES :(</Text>
        </View>
    )
  }

  const days = Math.ceil(
      (new Date(bookingSearch.endDate).getTime() - new Date(bookingSearch.startDate).getTime()) / (1000*60*60*24)
  );

  const totalCost = days * car.pricePerDay;
  const temparyBooking: Booking = {
    id: "tempary booking",
    userId: user?.id ?? '',
    carId: car?.id,
    startDate: bookingSearch.startDate,
    endDate: bookingSearch.endDate,
    pickUpLocation: bookingSearch.pickUpLocation,
    deliveryLocation: bookingSearch.deliveryLocation,
    payMethod: "Select next step",
    totalCost: totalCost
  }

  const handlePayment = async () => {
    const tempBooking: TempBooking = {
      userId: temparyBooking.userId,
      carId: temparyBooking.carId,
      startDate: temparyBooking.startDate,
      endDate: temparyBooking.endDate,
      pickUpLocation: bookingSearch.pickUpLocation,
      deliveryLocation: bookingSearch.deliveryLocation,
      payMethod: "Select next step",
      totalCost: totalCost
    };

    navigation.navigate('Payment', {booking: tempBooking});
  }

  return (
      <SafeAreaView edges={["left", "right", "bottom"]}>
        <View style={bookingDetailsStyle.backButton}>
        <Pressable
            style={bookingDetailsStyle.backButton}
            onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-outline" size={70} color="#7E7D7E80"/>
        </Pressable>
      </View>
        <BookingInfoBox booking={temparyBooking} car={car} />
        <Button title="Purchase" onPress={handlePayment} />
      </SafeAreaView>
  );
};

export default BookingDetails;

export const bookingDetailsStyle = StyleSheet.create({
  backButton: {
    width: 70,
    height:
        70,
  }
});
