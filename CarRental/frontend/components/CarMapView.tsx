import React, { useEffect } from 'react';
import {Car} from "../../backend/models";
import MapView, {Callout, Marker} from "react-native-maps";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import * as Location from 'expo-location';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { SearchStackParamList, BottomTabParams } from './BottomNav';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type BookingNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParams>,
    NativeStackNavigationProp<SearchStackParamList>
>

type MapViewProps = {
    type: "small" | "large";
}


const CarMapView: React.FC<MapViewProps> = ({type}) => {
    const [location, setLocation] = React.useState<any>();
    const [cars, setCars] = React.useState<Car[]>([]);
    const mapRef = React.useRef<MapView>(null);
    const navigation = useNavigation<BookingNavigationProp>();

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission denied',
                    'Allow the app to use location services',
                    [{text: 'OK'}]
                );
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        })();
    }, []);

    useEffect(() => {
        const carService = require('../../backend/CarService').CarService;
        carService.getInstance().then((service: any) => {
            const allCars: Car[] = service.getAllCars();
            console.log("Loaded cars for map:", allCars);
            setCars(allCars);
        });
    }, []);

    useEffect(() => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
        }
    }, [location]);

    
    return (
        <View style={styles.mapContainer}>
            {type === "small" && (
                <TouchableOpacity
                    style={styles.fullScreenButton}
                    onPress={() => {
                        navigation.navigate('Search', {
                            screen: 'Booking'
                        });
                    }}
                >
                    <Text style={styles.fullScreenButtonText}>View Full Map</Text>
                </TouchableOpacity>
            )}
            <MapView
                ref={mapRef}
                provider="google"
                style={type === "small" ? styles.mapSmall : styles.mapLarge}
                showsUserLocation={true}
            >
                {cars.map((car) => (
                    <CarMapMarker key={car.id} car={car}/>
                ))}
            </MapView>
        </View>
    );
};

const CarMapMarker: React.FC<{ car: Car }> = ({car}) => {
    const navigation = useNavigation<BookingNavigationProp>();
    
    const handleNavigateToBookingDetails = () => {
        let today = new Date();
        let endDate = new Date();
        endDate.setDate(today.getDate() + 1);

        navigation.navigate('Search', {
            screen: 'BookingDetails',
            params: {
                carId: car.id,
                startDate: today.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0]
            }
        });
    };
    
    return (
        <Marker
            coordinate={{
                latitude: car.location.latitude,
                longitude: car.location.longitude,
            }}
            title={`${car.brand} ${car.model}`}
            description={car.description}
            onPress={() => {
                console.log(`Marker for ${car.brand} ${car.model} pressed`);
            }}
        >
            <Callout style={styles.callout} onPress={() => handleNavigateToBookingDetails()}>
                <CarView car={car}/>
            </Callout>
        </Marker>
    );
}

const CarView: React.FC<{ car: Car }> = ({car}) => {
    return (
        <View style={styles.calloutContainer}>
            <Image
                source={{uri: car.imageUrl}}
                style={styles.calloutImage}
                resizeMode="contain"
                />
            <View style={styles.calloutContent}>
                <Text style={styles.calloutTitle}>{`Car Name (${car.year})`}</Text>
                <Text style={styles.calloutDescription}>{car.description}</Text>
                <Text style={styles.calloutPrice}>{car.pricePerDay} DKK<Text style={styles.calloutPriceDaily}>/daily</Text></Text>
            </View>
        </View>
    );
}




export default CarMapView;

const styles = StyleSheet.create({
    mapContainer: {
        position: 'relative',
        width: '100%',
    },
    mapSmall: {
        width: '100%',
        height: 350,
        borderRadius: 20,
        borderWidth: 1,
        marginVertical: 10,
    },
    mapLarge: {
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        marginVertical: 10,
    },
    callout: {
        width: 200,
        borderRadius: 16,
        overflow: 'hidden',
    },
    calloutContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    calloutImage: {
        width: '100%',
        height: 100,
        backgroundColor: '#f0f0f0',
    },
    calloutContent: {
        padding: 12,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    calloutDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6,
    },
    calloutPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF0000',
    },
    calloutPriceDaily: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666',
    },
    fullScreenButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1000,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    fullScreenButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#007AFF',
    },
})