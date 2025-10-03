import React from 'react';
import {View} from 'react-native';
import {ReceiptStackParamList, RootStackParamList} from '../../App';
import ConfirmationCard from "../components/cards/ConfirmationCard";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

type ConfirmationProps = NativeStackScreenProps<ReceiptStackParamList, 'Confirmation'>;

const Confirmation: React.FC<ConfirmationProps> = ({ route, navigation }) => {
    return (
        <View>
            <ConfirmationCard navigation={navigation} route={route} />
        </View>
    )
};

export default Confirmation;
