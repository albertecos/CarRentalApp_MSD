import {Text, TouchableOpacity, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackParamList, SearchStackParamList} from "../components/BottomNav";
import React from "react";
import {Car} from "../../backend/models";
import Header from "../components/Header";
import SearchBooking from "../components/SearchBooking";
import {SafeAreaView} from "react-native-safe-area-context";

type ResultPageProps = NativeStackScreenProps<HomeStackParamList, 'ResultPage'>;

const ResultPage: React.FC<ResultPageProps> = ({navigation, route}) => {
    const {bookingSearch} = route.params;

    const handleCarDetails = async () => {

    }
    return (
        <SafeAreaView edges={["left", "right", "bottom"]}>
            <Header/>
            <View>
                <Text>RESULT PAGE</Text>
                <Text>START DATE: {bookingSearch.startDate}</Text>
                <Text>END DATE: {bookingSearch.endDate}</Text>
                <Text>PICK UP LOCATION: {bookingSearch.pickUpLocation}</Text>
                <Text>DELIVERY LOCATION: {bookingSearch.deliveryLocation}</Text>

                <TouchableOpacity onPress={handleCarDetails}>
                    <Text >
                        car card
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default ResultPage;