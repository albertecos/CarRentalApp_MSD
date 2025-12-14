import React from "react";
import {View, StyleSheet} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Feather, Ionicons, FontAwesome5} from "@expo/vector-icons";

import Home from "../screens/Home";
import Booking from "../screens/Booking";
import UserBookings from "../screens/UserBookings";
import Settings from "../screens/Settings";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BookingDetails from "../screens/BookingDetails";
import Confirmation from "../screens/Confirmation";
import MapPage from "../screens/MapPage";
import Payment from "../screens/Payment";
import {BookingSearch, TempBooking} from "../../backend/models";
import SearchBooking from "./SearchBooking";
import ResultPage from "../screens/ResultPage";
import CarDetails from "../screens/CarDetails";

export type SearchStackParamList = {
    Booking: undefined;
    BookingDetails: {
        carId: string;
        startDate: string;
        endDate: string;
    };
    Payment: {
        booking: TempBooking;
    };
    Confirmation: {
        bookingId: string;
    };
};

export type UserBookingsStackParamList = {
    UserBookings: undefined;
    Confirmation: {
        bookingId: string;
    };
};

export type HomeStackParamList = {
    Home: undefined;
    ResultPage: {
        bookingSearch: BookingSearch;
    };
    MapPage: {
        camera?: any;
    };
    CarDetails: {
        carId: string;
    };
    BookingDetails: {
        carId: string;
        startDate: string;
        endDate: string;
    };
    Payment: {
        booking: TempBooking;
    };
    Confirmation: {
        bookingId: string;
    };
}
const SearchStack = createNativeStackNavigator<SearchStackParamList>();
const UserBookingsStack = createNativeStackNavigator<UserBookingsStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>()

function SearchStackScreen(){
    return(
        <SearchStack.Navigator screenOptions={{headerShown: false}}>
            <SearchStack.Screen name="Booking" component={Booking} />
            <SearchStack.Screen name="BookingDetails" component={BookingDetails} />
            <SearchStack.Screen name="Payment" component={Payment}/>
            <SearchStack.Screen name="Confirmation" component={Confirmation}/>
        </SearchStack.Navigator>
    )
}
function UserBookingsStackNavigator(){
    return(
        <UserBookingsStack.Navigator screenOptions={{headerShown: false}}>
            <UserBookingsStack.Screen name="UserBookings" component={UserBookings} />
            <UserBookingsStack.Screen name="Confirmation" component={Confirmation} />
        </UserBookingsStack.Navigator>
    )
}

function HomeStackNavigator(){
    return(
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="ResultPage" component={ResultPage} />
            <HomeStack.Screen name="MapPage" component={MapPage} />
            <HomeStack.Screen name="CarDetails" component={CarDetails}/>
            <HomeStack.Screen name="BookingDetails" component={BookingDetails} />
            <HomeStack.Screen name="Payment" component={Payment}/>
            <HomeStack.Screen name="Confirmation" component={Confirmation}/>
        </HomeStack.Navigator>
    )
}


export type BottomTabParams = {
    Home: undefined;
    Search: any;
    UserBooking: undefined;
    Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParams>();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tab.Screen name="Home"
                        component={HomeStackNavigator}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <IconWithDot focused={focused}>
                                    <Feather name="home" size={24}/>
                                </IconWithDot>
                            ),
                        }}
            />

            <Tab.Screen name="Search"
                        component={SearchStackScreen}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <IconWithDot focused={focused}>
                                    <Feather name="map-pin" size={24}/>
                                </IconWithDot>
                            ),
                        }}
            />

            <Tab.Screen name="UserBooking"
                        component={UserBookingsStackNavigator}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <IconWithDot focused={focused}>
                                    <FontAwesome5 name="car" size={24}/>
                                </IconWithDot>
                            ),
                        }}
            />

            <Tab.Screen name="Settings"
                        component={Settings}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <IconWithDot focused={focused}>
                                    <Ionicons name="settings-sharp" size={24}/>
                                </IconWithDot>
                            ),
                        }}
            />

        </Tab.Navigator>
    );
};

export default BottomTabs;


type IconWithDotProps = {
    focused: boolean;
    children: React.ReactNode;
}

const IconWithDot: React.FC<IconWithDotProps> = ({focused, children}) => {
    return (
        <View style={styles.iconWrapper}>
            {children}
            {focused && <View style={styles.dot}/>}
        </View>
    );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#F7F5F5",
    borderTopColor: "#DADADA",
    borderTopWidth: 1,
    height: 60,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E3342F",
    marginTop: 6,
  },
});




