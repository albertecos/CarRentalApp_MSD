import React from 'react';
import {View} from 'react-native';
import {SearchStackParamList} from '../../App';
import ConfirmationCard from "../components/cards/ConfirmationCard";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

type ConfirmationProps = NativeStackScreenProps<SearchStackParamList, 'Confirmation'>;

const Confirmation: React.FC<ConfirmationProps> = ({ route, navigation }) => {
    return (
        <View>
            <ConfirmationCard navigation={navigation} route={route} />
        </View>
    )
};

export default Confirmation;
