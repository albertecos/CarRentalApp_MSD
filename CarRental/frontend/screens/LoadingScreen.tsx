import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoadingScreen() {
    return (
        <LinearGradient
            colors={['#C83A2F', '#8B1E14']}
            style={styles.container}
        >
            <View style={styles.centerContent}>
                <Image
                    source={require('../assets/carLogo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>CarRental</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContent: {
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
        tintColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
    },
});