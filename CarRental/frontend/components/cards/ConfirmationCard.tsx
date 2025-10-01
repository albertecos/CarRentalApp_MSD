import {Image, View} from "react-native";

export default function ConfirmationCard(){
    function confirm(){
        console.log('Confirmed booking of car');
    }

    const imgsrc = require("../../../assets/car.png");

    return (
        <View>
            <Image source={imgsrc}/>
            getCarById(imgsrc)
            getBookingById()

        </View>
    )
}