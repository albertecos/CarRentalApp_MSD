import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackScreenProps } from '@react-navigation/stack';

type ConfirmationProps = StackScreenProps<RootStackParamList, 'Confirmation'>;

const Confirmation: React.FC<ConfirmationProps> = ({ route, navigation }) => {

    return (
        <View>

        </View>
    )
};

export default Confirmation;
