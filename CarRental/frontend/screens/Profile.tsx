import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


const Profile: React.FC = () => {
    const navigation = useNavigation();
    const defaultImage = require('../assets/defaultpp.jpg');

    // const data = () => {
    //
    // }
    return (
        <View>
            <Text>Profile page</Text>
            <Image source={defaultImage} style={styles.image}/>
            <Pressable style={styles.buttons}>
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
        width: 100,
        height: 100,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 50,
        alignSelf: 'center',
    },
    buttons: {
        marginTop: 35,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        paddingBlock: 15,
        paddingInline: 35,
    }
});