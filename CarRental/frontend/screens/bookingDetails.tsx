import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native'; // Add Image here
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Adjust path as needed
import { BookingService, CarService } from '../../backend/service';
import { Booking } from '../../backend/models';


type BookingDetailsProps = StackScreenProps<RootStackParamList, 'BookingDetails'>;

const BookingDetail: React.FC<BookingDetailsProps> = ({ route, navigation }) => {
  const { carId, startDate, endDate } = route.params;

  const icons = {
    airConditioning: "data:image/png;base64,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",
    seat: "data:image/png;base64,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",
    transmission: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4lRZ6RnZMRyTNiGwjDnINZxdipejyBz0BFw&s",
    fuel: "data:image/png;base64,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",
  }

  let car = CarService.getInstance().getCarById(carId);
  let dayCost = car?.pricePerDay || 0;
  let totalCost = dayCost * ( (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24) );

  // Format date range to dd/mm - dd/mm/yyyy
  let toFromDateStr = `${new Date(startDate).getDate()}/${new Date(startDate).getMonth() + 1} - ${new Date(endDate).getDate()}/${new Date(endDate).getMonth() + 1}/${new Date(endDate).getFullYear()}`;
  
  const uri = car?.imageUrl || 'https://via.placeholder.com/150';
      
  const handleBooking = () => {
    let bookingId = Math.random().toString(36).substring(2, 15); // Simple random ID generation
    let bookingObj: Booking = {
        id: bookingId,
        carId: carId,
        userId: 'user123', // In real app, fetch from logged-in user context
        startDate: startDate,
        endDate: endDate,
        totalCost: totalCost,
    };

    BookingService.getInstance().createBooking(bookingObj);

    navigation.navigate('Confirmation', {
        bookingId: bookingId
    });
  }

  function makeFirstLetterUpperCase(str: string | undefined) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.carInfo}>
        <Image source={{ uri }} style={styles.carImage} />
        <View style={styles.carDetails}>
          <Text>{car?.brand} - {car?.model}</Text>
          <Text>Year: {car?.year}</Text>
          {car?.available ? (
            <Text style={{ color: 'green' }}>Status: Available</Text>
          ) : (
            <Text style={{ color: 'red' }}>Status: Not Available</Text>
          )}
        </View>
      </View>

        <Text style={{ fontWeight: 'bold' }}>Description:</Text>
        <Text>{car?.description}</Text>

      <View style={{ height: 10 }} />

      <Text style={{ fontWeight: 'bold' }}>Features:</Text>
      <View style={styles.featureView}>
        <View style={styles.featureItem}>
            <Image source={{ uri: icons.airConditioning }} style={{width: 16, height: 16}} />
            <Text>{car?.features.airConditioning ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.featureItem}>
            <Image source={{ uri: icons.seat }} style={{width: 16, height: 16}} />
            <Text>{car?.features.numberOfSeats}</Text>
        </View>
        <View style={styles.featureItem}>
            <Image source={{ uri: icons.transmission }} style={{width: 16, height: 16}} />
            <Text>{makeFirstLetterUpperCase(car?.features.transmission)}</Text>
        </View>
        <View style={styles.featureItem}>
            <Image source={{ uri: icons.fuel }} style={{width: 16, height: 16}} />
            <Text>{makeFirstLetterUpperCase(car?.features.fuelType)}</Text>
        </View>
      </View>

      <View style={{ height: 10 }} />

      <Text style={{ fontWeight: 'bold' }}>Extras:</Text>
        {car?.extras.length ? (
          <View style={styles.extraView}>
            {car.extras.map((extra, index) => (
              <Text key={index} style={styles.extras}>{extra}</Text>
            ))}
          </View>
        ) : (
          <Text>No extras available</Text>
        )}

      <Text>Location: {car?.location}</Text>

      <View style={styles.bookingDetailsBox}>
        <View style={styles.bookingDetails}>
          <Text style={styles.totalCost}>Total Cost: {totalCost}kr.</Text>
          <Text>{toFromDateStr}</Text>
        </View>
        <View style={{ justifyContent: 'center'}}>
          <Button title="Confirm Booking" onPress={handleBooking} />
        </View>
      </View>
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  carInfo: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  carImage: {
    width: 200,
    height: 100,
    marginRight: 10,
  },
  carDetails: {
    justifyContent: 'center',
  },
  extraView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  extras: {
    margin: 5,
    backgroundColor: '#d3d3d3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  bookingDetails: {
    padding: 10,
    marginVertical: 10,
  },
  bookingDetailsBox: {
    backgroundColor: '#e01313ff',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bookingDetailText: {
    fontSize: 16,
    marginVertical: 2,
  },
  totalCost: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  featureView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 7,
    marginVertical: 5,
  },
  featureItem: { 
    width: '50%', 
    marginBottom: 5, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
});