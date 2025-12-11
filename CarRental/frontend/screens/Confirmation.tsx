import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
// import {SearchStackParamList} from '../../App';
import ConfirmationCard from "../components/cards/ConfirmationCard";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {SearchStackParamList} from "../components/BottomNav";

type ConfirmationProps = NativeStackScreenProps<SearchStackParamList, 'Confirmation'>;

const Confirmation: React.FC<ConfirmationProps> = ({ route, navigation }) => {
    return (
        <SafeAreaView edges={["top", "left", "right", "bottom"]}>
            <ConfirmationCard navigation={navigation} route={route} />
        </SafeAreaView>
    )
};

export default Confirmation;
