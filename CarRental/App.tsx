import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./frontend/screens/home";
import Profile from "./frontend/screens/Profile";
import Booking from './frontend/screens/booking';
import BookingDetail from './frontend/screens/bookingDetails';
import Confirmation from './frontend/screens/confirmation';
import {View} from "react-native";
import {AntDesign, Feather, MaterialIcons} from "@expo/vector-icons";
import UserBookings from "./frontend/screens/UserBookings";
import ContactPage from "./frontend/screens/Contact";


export type RootTabParams = {
    Home: undefined,
    Search: undefined,
    Profile: undefined,
}

const Tab = createBottomTabNavigator<RootTabParams>();


export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name={"Search"} component={BookingComponent}
                    options={{tabBarIcon: () => (
                            <Feather name="search" size={24} color="black" />)
                            }}/>
                <Tab.Screen name={"Home"} component={Home}
                    options={{tabBarIcon: () => (
                            <AntDesign name="car" size={24} color="black"/>),
                            }}/>
                <Tab.Screen name={"Profile"} component={ProfileComponent}
                    options={{tabBarIcon: () => (
                            <MaterialIcons name="face" size={24} color="black"/>)
                            }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};


function BookingComponent() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Booking" component={Booking}/>
            <Stack.Screen name="BookingDetails" component={BookingDetail}/>
            <Stack.Screen name="Confirmation" component={Confirmation}/>
        </Stack.Navigator>
    );
}

function ProfileComponent() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Your bookings" component={UserBookings}/>
            <Stack.Screen name="Contact" component={ContactPage}/>
        </Stack.Navigator>
    )
}



export type RootStackParamList = {
    Booking: undefined;
    BookingDetails: {
        carId: string;
        startDate: string;
        endDate: string;
    };
    Confirmation: {
        carId: string;
        startDate: string;
        endDate: string;
        totalCost: number;
    }
};
