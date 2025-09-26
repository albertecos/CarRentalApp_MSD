import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native'; // Add Image here
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Adjust path as needed
import { CarService } from '../../backend/service';


type BookingDetailsProps = StackScreenProps<RootStackParamList, 'BookingDetails'>;

const BookingDetail: React.FC<BookingDetailsProps> = ({ route, navigation }) => {
  const { carId, startDate, endDate } = route.params;

  let car = CarService.getInstance().getCarById(carId);
  let totalCost = 0;
  for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    // 0 = Sunday, 6 = Saturday
    if (day === 0 || day === 6) {
      totalCost += car?.pricePerDay.weekend || 0;
    } else {
      totalCost += car?.pricePerDay.weekday || 0;
    }
    // For simplicity, not handling holidays here
  }

  // Format date range to dd/mm - dd/mm/yyyy
  let toFromDateStr = `${new Date(startDate).getDate()}/${new Date(startDate).getMonth() + 1} - ${new Date(endDate).getDate()}/${new Date(endDate).getMonth() + 1}/${new Date(endDate).getFullYear()}`;
  
  const uri = car?.imageUrl || 'https://via.placeholder.com/150';
      
  const handleBooking = () => {
    navigation.navigate('Confirmation', {
        bookingId: "booking1"
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.carInfo}>
        <Image source={{ uri }} style={styles.carImage} />
        <View style={styles.carDetails}>
          <Text>{car?.make} - {car?.model}</Text>
          <Text>Year: {car?.year}</Text>
          {car?.available ? (
            <Text>Status: Available</Text>
          ) : (
            <Text>Status: Not Available</Text>
          )}
        </View>
      </View>

      <Text>{car?.description}</Text>

      <View style={{ height: 10 }} />

      <Text style={{ fontWeight: 'bold' }}>Features:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={{ width: '50%', marginBottom: 5 }}>
          <Text> - Air Conditioning: {car?.features.airConditioning ? 'Yes' : 'No'}</Text>
        </View>
        <View style={{ width: '50%', marginBottom: 5 }}>
          <Text> - Number of Seats: {car?.features.numberOfSeats}</Text>
        </View>
        <View style={{ width: '50%', marginBottom: 5 }}>
          <Text> - Transmission: {car?.features.transmission}</Text>
        </View>
        <View style={{ width: '50%', marginBottom: 5 }}>
          <Text> - Fuel Type: {car?.features.fuelType}</Text>
        </View>
      </View>
      <Text>Extras: {car?.extras.join(', ')}</Text>
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
});