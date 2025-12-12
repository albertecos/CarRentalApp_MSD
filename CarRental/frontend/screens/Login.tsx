import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {useFonts, MadimiOne_400Regular} from '@expo-google-fonts/madimi-one';
import {SafeAreaView} from "react-native-safe-area-context";
import {UseUserContext} from "../../UserContext";
import axios from "axios";
import {API_BASE_URL} from "@env";

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
    const navigation = useNavigation<LoginScreenProp>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = UseUserContext();

    const [fontsLoaded] = useFonts({
        MadimiOne: MadimiOne_400Regular,
    });
    if (!fontsLoaded) {
        return null;
    }

    const handleLogin = async () => {
        console.log("URL:", `${API_BASE_URL}/login/user`);
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                name: username,
                password: password,
            });

            const currentUser = response.data;

            setUser({
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email ?? "Cannot fetch email",
                phone: currentUser.phone ?? "Cannot fetch phone number",
                birthday: currentUser.birthday ?? "Cannot fetch birthday",
                location: currentUser.location ?? "Cannot fetch location",
            });
            navigation.replace('Tabs');

        } catch (error: any) {
            Alert.alert('Error', 'Failed to login');
            console.error(error.response.data);
            console.error(error.message);
        }
    };

    const handleCreateAccount = () => {
        navigation.navigate('Create Account');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, {fontFamily: 'MadimiOne'}]}>
                Welcome back!
            </Text>

            <TextInput
                style={[styles.input, {fontFamily: 'MadimiOne'}]}
                placeholder="Username..."
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={[styles.input, {fontFamily: 'MadimiOne'}]}
                placeholder="Password..."
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={[styles.loginText, {fontFamily: 'MadimiOne'}]}>
                    Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCreateAccount}>
                <Text style={styles.registerText}>
                    Not registered yet? <Text style={styles.registerBold}>Create an account</Text>
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 40,
        textAlign: "center",
    },

    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#f3f1f1",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },

    loginButton: {
        width: "100%",
        backgroundColor: "#c43d32",   // matches the red button from screenshot
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10,
    },

    loginText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    registerText: {
        marginTop: 15,
        fontSize: 14,
        color: "#000",
    },

    registerBold: {
        fontWeight: "700",
    },
});
