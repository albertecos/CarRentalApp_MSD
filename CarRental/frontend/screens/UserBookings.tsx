import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import axios from "axios";
import {UseUserContext} from "../../UserContext";

const UserBookings: React.FC = () => {

    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {userId} = UseUserContext();

    useEffect(() => {
        if(!userId){
            setError("User not logged in");
            console.log("User not logged in");
            setLoading(false);
            return;
        }
        console.log("user id: " + userId);

        axios.get(`http://10.126.32.40:3000/bookings/${userId}`).then(
            res => {
                setBookings(res.data);
                console.log(res.data);
            }

        ).catch(err => {
            console.log("error: ", err);
            setError("Could not load bookings.");
        }).finally(() => setLoading(false))
    }, [userId]);

    if (loading) {
        return (
            <View>
                <Text style={styles.text}>Loading your bookings...</Text>
                <ActivityIndicator size="large" color={'#7c0808'}/>
            </View>
        )
    }

    if (error) {
        return (
            <View>
                <Text style={{alignSelf: 'center'}}>{error}</Text>
            </View>
        )
    }

    return (
        <View>
            <Text style={styles.text}>Your bookings</Text>

            <FlatList data={bookings}
              keyExtractor={(b, index) => b.id?.toString() ?? index.toString()}
              renderItem={({item}) => (
                  <View>
                      <Text>{item.id}</Text>
                      <Text>{item.userId}</Text>
                      <Text>{item.carId}</Text>
                      <Text>{item.startDate}</Text>
                      <Text>{item.endDate}</Text>
                      <Text>{item.totalCost}</Text>
                  </View>
              )}/>
        </View>
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