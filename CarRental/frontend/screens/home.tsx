import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
};

export default Home;
