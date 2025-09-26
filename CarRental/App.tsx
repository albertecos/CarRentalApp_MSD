import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Booking from './frontend/screens/booking';
import BookingDetail from './frontend/screens/bookingDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Confirmation from './frontend/screens/confirmation';

export type RootStackParamList = {
  Booking: undefined;
  BookingDetails: {
    carId: string;
    startDate: string;
    endDate: string;
  };
  Confirmation: {
    bookingId: string;
  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="BookingDetails" component={BookingDetail} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
