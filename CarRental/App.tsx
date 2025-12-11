import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserContextProvider from './UserContext';
import CreateAccount from "./frontend/screens/CreateAccount";
import Login from "./frontend/screens/Login";
import BottomTabs from "./frontend/components/BottomNav";

export type RootStackParamList = {
    Login: undefined;
    "Create Account": undefined;
    Tabs: undefined;
};

const RootStack = createNativeStackNavigator();

export default function App() {
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

