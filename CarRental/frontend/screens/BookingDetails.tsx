import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native'; // Add Image here
import {HomeStackParamList, SearchStackParamList, UserBookingsStackParamList} from "../components/BottomNav";

import {CarService } from '../../backend/CarService';
import {Booking, Car, TempBooking} from '../../backend/models';
import {UseUserContext} from "../../UserContext";
import {StackScreenProps} from "@react-navigation/stack";
import BookingInfoBox from "../components/cards/BookingInfoBox";

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
      <View>
        <Text>BOOKING PAGE</Text>
        <BookingInfoBox booking={temparyBooking} car={car} />
        <Button title="Purchase" onPress={handlePayment} />
      </View>
  );
};

export default BookingDetails;
