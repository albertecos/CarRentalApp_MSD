import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./frontend/screens/Home";
import Profile from "./frontend/screens/Profile";
import Booking from './frontend/screens/Booking';
import Confirmation from './frontend/screens/Confirmation';
import {AntDesign, Feather, MaterialIcons} from "@expo/vector-icons";
import UserBookings from "./frontend/screens/UserBookings";
import ContactPage from "./frontend/screens/Contact";
import React, {useEffect, useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserContextProvider from './UserContext';
import CreateAccount from "./frontend/screens/CreateAccount";
import Login from "./frontend/screens/Login";
import BookingDetails from "./frontend/screens/BookingDetails";
import Settings from "./frontend/screens/Settings";
import ConfirmationCard from "./frontend/components/cards/ConfirmationCard";
import LoadingScreen from "./frontend/screens/LoadingScreen";
import BottomTabs from "./frontend/components/BottomNav";

export type RootStackParamList = {
    Login: undefined;
    "Create Account": undefined;
    Tabs: undefined;
};

export type TabParamList = {
    Search: undefined;
    Home: undefined;
    Profile: undefined;
}

export type SearchStackParamList = {
    Booking: undefined;
    BookingDetails:{
        carId: string;
        startDate: string;
        endDate: string;
    };
    Confirmation: {
        bookingId: string;
    };
};

export type ProfileStackParamList = {
    Profile: undefined;
    "Your bookings": undefined;
    Settings: undefined;
    Contact: undefined;
}



const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();
const ProfileStack = createNativeStackNavigator();

export default function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return <LoadingScreen/>;
    }
    return (
        <SafeAreaProvider>
            <UserContextProvider>
                <NavigationContainer>
                    <RootStack.Navigator screenOptions={{headerShown: false}}>
                        <RootStack.Screen name="Login" component={Login}/>
                        <RootStack.Screen name="Create Account" component={CreateAccount}/>
                        <RootStack.Screen name="Tabs" component={BottomTabs}/>
                    </RootStack.Navigator>
                </NavigationContainer>
            </UserContextProvider>
        </SafeAreaProvider>
    );
}