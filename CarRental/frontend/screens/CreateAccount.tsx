import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useFonts, MadimiOne_400Regular } from '@expo-google-fonts/madimi-one';
import {SafeAreaView} from "react-native-safe-area-context";
import {API_BASE_URL} from "@env";
import axios from "axios";
import {UseUserContext} from "../../UserContext";

type CreateAccountScreenProp = NativeStackNavigationProp<RootStackParamList, 'Create Account'>;

const CreateAccount: React.FC = () => {
    const navigation = useNavigation<CreateAccountScreenProp>();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [checked, setChecked] = useState(false);

    const { setUser } = UseUserContext();

    const [fontsLoaded] = useFonts({
        MadimiOne: MadimiOne_400Regular,
    });
    if (!fontsLoaded) return null;

    const handleCreateAccount = async () => {
        console.log("URL:", `${API_BASE_URL}/create/user`);
        if (!username || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/create/user`, {
                name: username,
                password: password,
                email: email,
                birthday: `${String(year).padStart(4,'0')}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`,
                phone: "Unknown",
                location: "Unknown"
            });

            const newUser = response.data;

            setUser({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                birthday: newUser.birthday,
                location: newUser.location,
            })



            navigation.replace('Tabs');
        } catch (error) {
            Alert.alert('Error', 'Failed to create account');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <Text style={[styles.title, { fontFamily: 'MadimiOne' }]}>
                Register to get{'\n'}started!
            </Text>

            <TextInput
                style={[styles.input, { fontFamily: 'MadimiOne' }]}
                placeholder="Username..."
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={[styles.input, { fontFamily: 'MadimiOne' }]}
                placeholder="Email..."
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={[styles.input, { fontFamily: 'MadimiOne' }]}
                placeholder="Password..."
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={[styles.input, { fontFamily: 'MadimiOne' }]}
                placeholder="Confirm password..."
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <Text style={styles.birthdayLabel}>Birthday:</Text>

            <View style={styles.birthdayRow}>
                <TextInput
                    style={styles.birthdayInput}
                    placeholder="DD"
                    value={day}
                    onChangeText={setDay}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInput
                    style={styles.birthdayInput}
                    placeholder="MM"
                    value={month}
                    onChangeText={setMonth}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInput
                    style={styles.birthdayInput}
                    placeholder="YYYY"
                    value={year}
                    onChangeText={setYear}
                    keyboardType="numeric"
                    maxLength={4}
                />
            </View>

            <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setChecked(!checked)}
                activeOpacity={0.7}
            >
                <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
                <Text style={styles.checkboxText}>
                    I have read the <Text style={styles.link}>terms</Text> and{' '}
                    <Text style={styles.link}>conditions</Text>,{'\n'}and wish to sign up
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupButton} onPress={handleCreateAccount}>
                <Text style={[styles.signupText, { fontFamily: 'MadimiOne' }]}>Sign up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: '#fff',
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    backArrow: { fontSize: 20 },

    title: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 35,
        lineHeight: 32,
    },

    input: {
        height: 50,
        backgroundColor: '#f1eeee',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 0,
    },

    birthdayLabel: {
        marginTop: 5,
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '600',
    },

    birthdayRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },

    birthdayInput: {
        flex: 1,
        height: 45,
        backgroundColor: '#f1eeee',
        borderRadius: 8,
        paddingHorizontal: 10,
    },

    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 25,
        gap: 10,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: '#cc3b2f',
        borderColor: '#cc3b2f',
    },

    checkboxText: {
        fontSize: 12,
        color: '#333',
    },
    link: {
        textDecorationLine: 'underline',
    },

    signupButton: {
        backgroundColor: '#cc3b2f',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
    },

    signupText: {
        fontSize: 18,
        color: '#fff',
    },
});
