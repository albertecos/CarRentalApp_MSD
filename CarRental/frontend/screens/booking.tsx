import React from 'react';
import { Text, ScrollView, TextInput} from 'react-native';
//import { useNavigation } from '@react-navigation/native';
import CarCards from "../components/cards/carCards";
import {cars} from "../../backend/data/cars";
import '../styling/BookingPageStyle';
import { normalFont, searchBar } from "../styling/BookingPageStyle";

const Booking: React.FC = () => {
    //const navigation = useNavigation();

    return (
        <ScrollView>
            <BookingDetails/>
            <Text style={normalFont.container}>Your search gave 3 results</Text>
            {cars.map((car) => (
                <CarCards key={car.id} car={car}/>
            ))}
        </ScrollView>
    )
};

export default Booking;

class BookingDetails extends React.Component {
    state = {
        search: '',
    };

    updateSearch = (input: string) => {
        this.setState({ search: input });
    };

    render() {
        const { search } = this.state;

        return (
            <TextInput
                style = {searchBar.container}
                placeholder="Search booking..."
                onChangeText={this.updateSearch}
                value={search}
            />
        );
    }
}