import React from 'react';
import {View, Text, Button, Image, StyleSheet, Pressable, TouchableOpacity, TextInput, ScrollView} from 'react-native'; // Add Image here
import {HomeStackParamList, UserBookingsStackParamList} from "../components/BottomNav";

import {CarService } from '../../backend/CarService';
import {Booking, Car, TempBooking} from '../../backend/models';
import {UseUserContext} from "../../UserContext";
import {StackScreenProps} from "@react-navigation/stack";
import BookingInfoBox from "../components/cards/BookingInfoBox";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import BookHeader from "../components/BookHeader";
import BookingProgress from "../components/BookingProgress";
import {bookingDetailsStyle} from "../styling/BookingDetailsStyle";
import {scrollingStyling} from "../styling/scrollingStyling";

type BookingDetailsProps = StackScreenProps<HomeStackParamList, 'BookingDetails'>;

const BookingDetails: React.FC<BookingDetailsProps> = ({ route, navigation }) => {
  const { carId, bookingSearch } = route.params ?? {};
  const [car, setCar] = React.useState<Car | null>(null);
  const {user} = UseUserContext();

  const [fullname, setFullname] = React.useState(user?.name ?? "");
  const [email, setEmail] = React.useState(user?.email ?? "");
  const [phone, setPhone] = React.useState(user?.phone ?? "");

  React.useEffect(() => {
    async function fetchCar() {
      let carService = await CarService.getInstance();
      let fetchedCar = carService.getCarById(carId);
      setCar(fetchedCar ?? null);
    }
    fetchCar();
  }, [carId]);

  if (!car) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Loading... car can't be found</Text>
      </SafeAreaView>
    );
  }

  const startDate = bookingSearch.startDate ?? new Date(Date.now()).toISOString();
  const endDate = bookingSearch.endDate ?? new Date(Date.now() + 24*60*60*1000 ).toISOString();
  const days = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000*60*60*24)
  );

  const totalCost = days * car.pricePerDay;
  const temparyBooking: Booking = {
    id: "tempary booking",
    userId: user?.id ?? '',
    carId: car?.id,
    startDate: startDate,
    endDate: endDate,
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
      <SafeAreaView edges={["left", "right"]} style={{ flex: 1, backgroundColor: "white" }}>
        <BookHeader title={"Booking Details"} navigation={navigation} />
        <BookingProgress currentStep={"booking"}/>

        <ScrollView style={{flex: 1}} contentContainerStyle={[scrollingStyling.scrollContent, {flexGrow: 1}]}>

        <View style={bookingDetailsStyle.section}>
          <Text style={bookingDetailsStyle.title}>Customer</Text>
          <TextInput style={bookingDetailsStyle.input} placeholder={"Full name"} value={fullname} onChangeText={setFullname}></TextInput>
          <TextInput style={bookingDetailsStyle.input} placeholder={"Email adress"} value={email} onChangeText={setEmail}></TextInput>
          <TextInput style={bookingDetailsStyle.input} placeholder={"Phone number"} value={phone} onChangeText={setPhone}></TextInput>
        </View>


        <BookingInfoBox booking={temparyBooking} car={car} />
        <TouchableOpacity style={bookingDetailsStyle.confirmButton} onPress={handlePayment}>
          <Text style={bookingDetailsStyle.confirmText}>Confirm booking</Text>
        </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  );
};

export default BookingDetails;

