import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useFonts, MadimiOne_400Regular } from '@expo-google-fonts/madimi-one';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "./Home";

type CreateAccountScreenProp = NativeStackNavigationProp<RootStackParamList, 'Create Account'>;

const CreateAccount: React.FC = () => {
    const navigation = useNavigation<CreateAccountScreenProp>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [fontsLoaded] = useFonts({
        MadimiOne: MadimiOne_400Regular,
    });
    if (!fontsLoaded) {
        return null;
    }

    const handleCreateAccount = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }
        try {
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('password', password);

            // //Gør så Booking ikke er i en stack
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Booking' }],
            // });
            navigation.replace('Tabs');
        } catch (error) {
            Alert.alert('Error', 'Failed to create account');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { fontFamily: 'MadimiOne' }]}>Create account</Text>

            <TextInput
                style={[styles.input, { fontFamily: 'MadimiOne' }]}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={[styles.input, { fontFamily: 'MadimiOne' }]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                    <Text style={[styles.buttonText, { fontFamily: 'MadimiOne' }]}>Create account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        backgroundColor: '#f5f3f4',
        paddingVertical: 15,
        marginHorizontal: 5,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
});