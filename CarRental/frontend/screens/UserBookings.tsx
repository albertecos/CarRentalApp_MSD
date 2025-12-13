import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, SectionList} from 'react-native';
import axios from "axios";
import {UseUserContext} from "../../UserContext";
import {API_BASE_URL} from "@env";
import BookingCard from "../components/cards/BookingCard";
import {SafeAreaView} from "react-native-safe-area-context";
import {useIsFocused} from "@react-navigation/native";
import Header from "../components/Header";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import {UserBookingsStackParamList} from "../components/BottomNav";
import {CarService} from "../../backend/CarService";

import {Booking, Car} from "../../backend/models";

type BookingSection = {
    title: 'Active' | 'Expired';
    data: Booking[];
}

const UserBookings: React.FC = () => {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [carById, setCarById] = useState<{ [id: string]: Car }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {user} = UseUserContext();
    const isFocused = useIsFocused();

    type UserBookingNavProps = NativeStackNavigationProp<UserBookingsStackParamList, "UserBookings">;

    const navigation = useNavigation<UserBookingNavProps>();

    const getBookings = useCallback(async () => {
        if (!user) {
            setError("User not logged in");
            console.log("User not logged in");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try{
            const carService = await CarService.getInstance();

            const response = await axios.get(`${API_BASE_URL}/bookings?id=${user.id}`, {timeout: 5000});
            const fetchedBookings = response.data as Booking[];
            setBookings(fetchedBookings);

            const carIds = Array.from(new Set(fetchedBookings.map(b => b.carId)));
            const cars = await Promise.all(carIds.map(id => carService.getCarById(id)));

            const map: {[id: string]: Car} = {};
            for(const c of cars){
                if(c){
                    map[c.id] = c;
                }
            }
            setCarById(map);
        }catch (error: any) {
            setError("Could not load bookings");
        }finally{
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (isFocused) {
            getBookings();
        }
    }, [isFocused, getBookings]);

    if (loading) {
        return (
            <SafeAreaView edges={["top", "left", "right", "bottom"]}>
                <Text style={styles.text}>Loading your bookings...</Text>
                <ActivityIndicator size="large" color={'#7c0808'}/>
            </SafeAreaView>
        )
    }

    if (error) {
        return (
            <SafeAreaView edges={["left", "right", "bottom"]}>
                <Header/>
                <Text style={{
                    alignSelf: 'center',
                    textAlignVertical: 'center'
                }}
                >{error}</Text>
            </SafeAreaView>
        )
    }

    if(!loading && !error && bookings.length === 0){
        return (
            <SafeAreaView style={{flex:1,backgroundColor:"#f8f9fa"}} edges={["left", "right", "bottom"]}>
                <Header/>
                <Text style={{
                    fontSize: 24,
                    fontWeight:"bold",
                    margin:20,
                    alignSelf: 'center',
                    textAlignVertical: 'center'
                }}
                >Your bookings</Text>
                <Text style={{alignSelf: 'center',marginTop:40, color:"#666"}}>
                    You have no bookings yet
                </Text>
            </SafeAreaView>
        )
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isActive = (booking: Booking) =>
        new Date(booking.endDate) >= today;

    const activeBookings = bookings
        .filter(isActive)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const expiredBookings = bookings
        .filter((booking) => !isActive(booking))
        .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());

    const sections: BookingSection[] = [];
    if (activeBookings.length > 0) {
        sections.push({title: 'Active', data: activeBookings});
    }

    if (expiredBookings.length > 0) {
        sections.push({title: 'Expired', data: expiredBookings});
    }


    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: "#f8f9fa"}}
            edges={["top", "left", "right", "bottom"]}>
            <Text style={{fontSize: 24, fontWeight: "bold", margin: 20}}>
                Your bookings
            </Text>

            <SectionList sections={sections}
                         keyExtractor={(item) => item.id}
                         contentContainerStyle={{paddingBottom: 20}}
                         stickySectionHeadersEnabled={false}
                         renderItem={({item}) => {
                             const car = carById[item.carId];
                             if (!car) return null;
                             return (
                                 <BookingCard
                                     booking={item}
                                     car={car}
                                     onPress={() =>
                                         navigation.navigate('Confirmation', {bookingId: item.id})
                                     }
                                 />
                             );
                         }}
                         renderSectionHeader={({section}) => (
                             <View style={styles.sectionHeaderWrapper}>
                                 <View style={styles.sectionLine}>
                                     <View style={styles.sectionLabelWrapper}>
                                         <Text style={styles.sectionLabel}>
                                             {section.title.toUpperCase()}
                                         </Text>
                                     </View>
                                 </View>
                             </View>
                         )}
            />
        </SafeAreaView>
    )
};

export default UserBookings;

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 50,
        alignSelf: 'center',
    },
    buttons: {
        marginTop: 35,
        position: 'absolute',
        verticalAlign: 'top',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        paddingBlock: 15,
        paddingInline: 35,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom: 200,
        paddingTop: 20,
    },
    sectionHeaderWrapper: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 4,
        position: 'relative',
        justifyContent: 'center',
    },
    sectionLine: {
        height: 1,
        backgroundColor: '#ddd',
    },
    sectionLabelWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        paddingHorizontal: 8,
        backgroundColor: '#f8f9fa'
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#555',
    }
});