import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./frontend/screens/home";
import Profile from "./frontend/screens/Profile";
import Booking from './frontend/screens/booking';
import Confirmation from './frontend/screens/confirmation';
import {AntDesign, Feather, MaterialIcons} from "@expo/vector-icons";
import UserBookings from "./frontend/screens/UserBookings";
import ContactPage from "./frontend/screens/Contact";
import React from "react";
import UserContextProvider from './UserContext';
import CreateAccount from "./frontend/screens/createAccount";
import Login from "./frontend/screens/login";
import BookingDetails from "./frontend/screens/bookingDetails";

export type RootStackParamList = {
  Booking: undefined;
  BookingDetails: {
    carId: string;
    startDate: string;
    endDate: string;
  };
  Confirmation: {
    bookingId: string;
  }
    Login: undefined;
    CreateAccount: undefined;
    UserBookings: undefined;
};


export type RootTabParams = {
    Home: undefined,
    // Search: undefined,
    "Profile Page": undefined,
    Search: NavigatorScreenParams<ReceiptStackParamList>,
    Receipt: NavigatorScreenParams<ReceiptStackParamList>
}

export type ReceiptStackParamList = {
    Confirmation: {bookingId: string} | undefined;
};

const Tab = createBottomTabNavigator<RootTabParams>();

export default function App() {
    return (
        <UserContextProvider>
        <NavigationContainer>
            <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={'Home'}>
                <Tab.Screen name={"Search"} component={BookingComponent}
                    options={{tabBarIcon: () => (
                            <Feather name="search" size={24} color="black" />)
                            }}/>
                <Tab.Screen name={"Home"} component={Home}
                    options={{tabBarIcon: () => (
                            <AntDesign name="car" size={24} color="black"/>),
                            }}/>
                <Tab.Screen name={"Profile Page"} component={ProfileStack}
                    options={{tabBarIcon: () => (
                            <MaterialIcons name="face" size={24} color="black"/>)
                            }}/>
                <Tab.Screen name={"Receipt"} component={ConfirmationComponent}
                    options={{tabBarIcon: () => (
                            <MaterialIcons name="receipt" size={24} color="black"/>)
                            }}/>
            </Tab.Navigator>
        </NavigationContainer>
        </UserContextProvider>
    );
};

function Login_Create() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name={"CreateAccount"} component={CreateAccount}/>
        </Stack.Navigator>
    );
}

function BookingComponent() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name={"CreateAccount"} component={CreateAccount}/>
            <Stack.Screen name="Booking" component={Booking}/>
            <Stack.Screen name="BookingDetails" component={BookingDetails}/>
            <Stack.Screen name="Confirmation" component={Confirmation}/>
        </Stack.Navigator>
    );
}

function ProfileStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="UserBookings" component={UserBookings}/>
            <Stack.Screen name="Contact" component={ContactPage}/>
        </Stack.Navigator>
    )
}

function ConfirmationComponent() {
    const Stack = createNativeStackNavigator<ReceiptStackParamList>();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Confirmation" component={Confirmation}/>
        </Stack.Navigator>
    )
}


