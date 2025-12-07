import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {SafeAreaView} from "react-native-safe-area-context";


const Contact: React.FC = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView edges={["top", "left", "right", "bottom"]}>
            <Text>Contact information</Text>

            <Pressable style={styles.buttons} onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>
        </SafeAreaView>
    )
};

export default Contact;

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