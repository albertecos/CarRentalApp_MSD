import React, {useEffect, useState} from 'react';
import { Text, ScrollView, TextInput} from 'react-native';
import CarCards from "../components/cards/CarCards";
import axios from "axios";
import { normalFont, searchBar } from "../styling/BookingPageStyle";
import {Car} from "../../backend/models";
import {API_BASE_URL} from "@env";

const Booking: React.FC = () => {
    const [search, setSearch] = useState('');
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/cars`, {timeout: 5000}).then(
            res => {
                setCars(res.data);
            }
        ).catch(error => console.log(error));
    }, []);

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

            <Text style={normalFont.container}>Your search gave {filteredCars.length} results</Text>
            {filteredCars.map((car) => (
                <CarCards key={car.id} car={car}/>
            ))}
        </ScrollView>
    )
};

export default Booking;

