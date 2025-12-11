import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./frontend/screens/Home";
import Profile from "./frontend/screens/Profile";
import Booking from './frontend/screens/Booking';
import Confirmation from './frontend/screens/Confirmation';
import {AntDesign, Feather, MaterialIcons} from "@expo/vector-icons";
import UserBookings from "./frontend/screens/UserBookings";
import ContactPage from "./frontend/screens/Contact";
import React, {useEffect, useState} from "react";
import UserContextProvider from './UserContext';
import CreateAccount from "./frontend/screens/CreateAccount";
import Login from "./frontend/screens/Login";
import BookingDetails from "./frontend/screens/BookingDetails";
import Settings from "./frontend/screens/Settings";
import ConfirmationCard from "./frontend/components/cards/ConfirmationCard";
import {SafeAreaProvider} from "react-native-safe-area-context";
import LoadingScreen from "./frontend/screens/LoadingScreen";

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

function SearchStackScreen() {
    return (
        <SearchStack.Navigator screenOptions={{headerShown: false}} initialRouteName={'Booking'}>
            <SearchStack.Screen name="Booking" component={Booking}/>
            <SearchStack.Screen name="BookingDetails" component={BookingDetails}/>
            <SearchStack.Screen name="Confirmation" component={Confirmation}/>
        </SearchStack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator screenOptions={{headerShown: false}}>
            <ProfileStack.Screen name="Profile" component={Profile}/>
            <ProfileStack.Screen name="Your Bookings" component={UserBookings}/>
            <ProfileStack.Screen name="Settings" component={Settings}/>
            <ProfileStack.Screen name="Contact" component={ContactPage}/>
        </ProfileStack.Navigator>
    );
}

function Tabs() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            <Tab.Screen name={"Search"} component={SearchStackScreen}
                        options={{
                            tabBarIcon: () => (
                                <Feather name="search" size={24} color="black"/>)
                        }}/>
            <Tab.Screen name={"Home"} component={Home}
                        options={{
                            tabBarIcon: () => (
                                <AntDesign name="car" size={24} color="black"/>),
                        }}/>
            <Tab.Screen name={"Profile Page"} component={ProfileStackScreen}
                        options={{
                            tabBarIcon: () => (
                                <MaterialIcons name="face" size={24} color="black"/>)
                        }}/>
        </Tab.Navigator>
    );
}

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
                        <RootStack.Screen name="Tabs" component={Tabs}/>
                    </RootStack.Navigator>
                </NavigationContainer>
            </UserContextProvider>
        </SafeAreaProvider>
    );
}