import React from "react";
import {View, StyleSheet} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Feather, Ionicons, FontAwesome5} from "@expo/vector-icons";

import Home from "../screens/Home";
import Booking from "../screens/Booking";
import UserBookings from "../screens/UserBookings";
import Settings from "../screens/Settings";

export type BottomTabParams = {
    Home: undefined;
    Booking: undefined;
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
                        component={Home}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <IconWithDot focused={focused}>
                                    <Feather name="home" size={24}/>
                                </IconWithDot>
                            ),
                        }}
            />

            <Tab.Screen name="Booking"
                        component={Booking}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <IconWithDot focused={focused}>
                                    <Feather name="map-pin" size={24}/>
                                </IconWithDot>
                            ),
                        }}
            />

            <Tab.Screen name="UserBooking"
                        component={UserBookings}
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




