import {Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackParamList, SearchStackParamList} from "../components/BottomNav";
import {styles} from "../styling/HeaderStyling";

type CarDetailsProps = NativeStackScreenProps<HomeStackParamList, 'CarDetails'>;

const CarDetails: React.FC<CarDetailsProps> = ({route}) => {
    const {carId} = route.params;

    return (
        <View />
    )
}

export default CarDetails;