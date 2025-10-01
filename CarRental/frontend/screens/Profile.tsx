import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Profile: React.FC = () => {
    const navigation = useNavigation<any>();
    const defaultImage = require('../assets/defaultpp.jpg');

    return (
        <View>
            <Image source={defaultImage} style={styles.image}/>
            <Pressable style={styles.buttons} onPress={() => navigation.navigate('UserBookings')}>
                <Text>Your bookings</Text>
            </Pressable>
            <Pressable style={styles.buttons}>
                <Text>Settings</Text>
            </Pressable>
            <Pressable style={styles.buttons}>
                <Text>Contact</Text>
            </Pressable>
        </View>
    )
};

export default Profile;

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 750,
        alignSelf: 'center',
    },
    buttons: {
        marginTop: 50,
        marginBottom: -30,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        paddingBlock: 25,
        paddingInline: 55,
        backgroundColor: '#e6dddd',
    }
});