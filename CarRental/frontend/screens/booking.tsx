import React, {useState} from 'react';
import { Text, ScrollView, TextInput} from 'react-native';
import CarCards from "../components/cards/carCards";
import {cars} from "../../backend/data/cars";
import { normalFont, searchBar } from "../styling/BookingPageStyle";

const Booking: React.FC = () => {
    const [search, setSearch] = useState('');

    const filteredCars = cars.filter(car =>
        car.model.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <ScrollView>
            <TextInput
                style = {searchBar.container}
                placeholder="Search booking..."
                onChangeText={setSearch}
                value={search}
            />

            <Text style={normalFont.container}>Your search gave 3 results</Text>
            {filteredCars.map((car) => (
                <CarCards key={car.id} car={car}/>
            ))}
        </ScrollView>
    )
};

export default Booking;