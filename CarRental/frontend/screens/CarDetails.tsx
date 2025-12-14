import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../components/BottomNav';
import { CarService } from '../../backend/CarService';
import { Car } from '../../backend/models';
import CarMapView from '../components/CarMapView';
import BookHeader from "../components/BookHeader";

type CarDetailsProps = NativeStackScreenProps<HomeStackParamList, 'CarDetails'>;

const CarDetails: React.FC<CarDetailsProps> = ({ route, navigation }) => {
  const { carId, bookingSearch } = route.params;
  const [car, setCar] = React.useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const icons = {
    gearBox: require('../assets/gearbox-icon.png'),
    fuel: require('../assets/fuel-icon.png'),
    doors: require('../assets/doors-icon.png'),
    airConditioning: require('../assets/air_conditioner-icon.png'),
    seats: require('../assets/seats-icon.png'),
    distance: require('../assets/distance-icon.png'),
    location: require('../assets/location-icon.png'),
  } as const;

  React.useEffect(() => {
    async function fetchCar() {
      let carService = await CarService.getInstance();
      let fetchedCar = carService.getCarById(carId);
      setCar(fetchedCar ?? null);
    }
    fetchCar();
  }, [carId]);

  const makeFirstLetterUpperCase = (str: string | undefined) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const uri = car?.imageUrl || 'https://via.placeholder.com/400x200';


    let initials = car?.renter ? car?.renter.name.split(' ').map(n => n[0]).join('').toUpperCase() : '';

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <BookHeader title={"Car details"} navigation={navigation}/>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Car Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri }} style={styles.carImage} />
        </View>

        {/* Car Title and Price */}
        <View style={styles.headerSection}>
          <Text style={styles.carTitle}>{car?.brand} {car?.model} ({car?.year})</Text>
          <Text style={styles.description}>{car?.description}</Text>
          <View style={styles.priceButtonContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceAmount}>{car?.pricePerDay} DKK</Text>
              <Text style={styles.priceLabel}>/ daily</Text>
            </View>
            <TouchableOpacity
              style={styles.bookButtonInline}
              onPress={() => {
                navigation.navigate('BookingDetails',
                  {
                      carId,
                      bookingSearch: {
                        startDate: bookingSearch?.startDate || new Date().toISOString().split('T')[0],
                        endDate: bookingSearch?.endDate || new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
                        pickUpLocation: bookingSearch?.pickUpLocation || 'Default Location',
                        deliveryLocation: bookingSearch?.deliveryLocation ||'Default Location',
                      }
                  });
              }}
            >
              <Text style={styles.bookButtonText}>Book now</Text>
              <Text style={styles.bookButtonArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Car Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car features</Text>
          <View style={styles.featuresGrid}>
            {/* Row 1 */}
            <View style={styles.featureRow}>
              <View style={styles.featureItem}>
                <Image source={icons.gearBox} style={styles.featureIcon} />
                <Text style={styles.featureLabel}>Gear Box</Text>
                <Text style={styles.featureValue}>{makeFirstLetterUpperCase(car?.features.transmission)}</Text>
              </View>
              <View style={styles.featureItem}>
                <Image source={icons.fuel} style={styles.featureIcon} />
                <Text style={styles.featureLabel}>Fuel</Text>
                <Text style={styles.featureValue}>{makeFirstLetterUpperCase(car?.features.fuelType)}</Text>
              </View>
              <View style={styles.featureItem}>
                <Image source={icons.doors} style={styles.featureIcon} />
                <Text style={styles.featureLabel}>Doors</Text>
                <Text style={styles.featureValue}>{car?.features.doors}</Text>
              </View>
            </View>

            {/* Row 2 */}
            <View style={styles.featureRow}>
              <View style={styles.featureItem}>
                <Image source={icons.airConditioning} style={styles.featureIcon} />
                <Text style={styles.featureLabel}>Air Conditioner</Text>
                <Text style={styles.featureValue}>{car?.features.airConditioning ? 'Yes' : 'No'}</Text>
              </View>
              <View style={styles.featureItem}>
                <Image source={icons.seats} style={styles.featureIcon} />
                <Text style={styles.featureLabel}>Seats</Text>
                <Text style={styles.featureValue}>{car?.features.numberOfSeats}</Text>
              </View>
              <View style={styles.featureItem}>
                <Image source={icons.distance} style={styles.featureIcon} />
                <Text style={styles.featureLabel}>Distance</Text>
                <Text style={styles.featureValue}>500</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Car Renter Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car renter</Text>
          <View style={styles.renterCard}>
            <View style={styles.renterInfo}>
              <View style={styles.renterAvatar}>
                <Text style={styles.renterAvatarText}>{initials}</Text>
              </View>
              <View style={styles.renterDetails}>
                <Text style={styles.renterName}>{car?.renter.name}</Text>
                <View style={styles.renterContact}>
                  <Text style={styles.renterPhone}>{car?.renter.phone}</Text>
                  <Text style={styles.renterEmail}>{car?.renter.email}</Text>
                </View>
              </View>
            </View>

            {/* Location */}
            <View style={styles.locationContainer}>
              <Image
                source={icons.location}
                style={styles.locationIcon}
              />
              <View>
                <Text style={styles.locationName}>{car?.location.area}</Text>
              </View>
            </View>

            {/* Map Preview */}
            <CarMapView type="tiny" camera={{
                    center: {
                        latitude: car?.location.latitude || 0,
                        longitude: car?.location.longitude || 0,
                    },
                    zoom: 13,
                }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#e0e0e0',
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  headerSection: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 15,
  },
  carTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e01313',
    marginRight: 5,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  featuresGrid: {
    gap: 15,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  featureIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
    tintColor: '#333',
  },
  featureLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  renterCard: {
    gap: 15,
  },
  renterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renterAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  renterAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  renterDetails: {
    flex: 1,
  },
  renterName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  renterContact: {
    flexDirection: 'row',
    gap: 15,
  },
  renterPhone: {
    fontSize: 13,
    color: '#666',
  },
  renterEmail: {
    fontSize: 13,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationIcon: {
    width: 24,
    height: 30,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  locationCountry: {
    fontSize: 13,
    color: '#666',
  },
  mapPreview: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  bookButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#e01313',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bookButtonArrow: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  bookButtonInline: {
    backgroundColor: '#e01313',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default CarDetails;