import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import axios from "axios";
import {UseUserContext} from "../../UserContext";
import {API_BASE_URL} from "@env";
import BookingCard from "../components/cards/BookingCard";
import {SafeAreaView} from "react-native-safe-area-context";
import {useIsFocused} from "@react-navigation/native";
import Header from "../components/Header";

const UserBookings: React.FC = () => {

    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {user} = UseUserContext();
    const isFocused = useIsFocused();

    const getBookings = useCallback(() => {
        if (!user) {
            setError("User not logged in");
            console.log("User not logged in");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        axios.get(`${API_BASE_URL}/bookings/${user.id}`, {timeout: 5000})
            .then(res => {
                setBookings(res.data);
                console.log("Fetched bookings: " + res.data);
            })
            .catch(err => {
                console.error("error: ", err, err?.response?.status);
                setError("Could not load bookings.");
            })
            .finally(() => setLoading(false))
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

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#f8f9fa"}} edges={["top", "left", "right", "bottom"]}>
            <Text style={{fontSize: 24, fontWeight: "bold", margin: 20}}>
                Your bookings
            </Text>

            <FlatList
                data={bookings}
                keyExtractor={(b, index) => b.id?.toString() ?? index.toString()}
                renderItem={({item}) => <BookingCard booking={item}/>}
                contentContainerStyle={{paddingBottom: 20}}/>

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
    }
});