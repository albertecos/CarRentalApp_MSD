import React, {useEffect, useState} from 'react';
import {Text, ScrollView, TextInput, View} from 'react-native';
import CarCards from "../components/cards/CarCards";
import axios from "axios";
import { normalFont, searchBar, titleFont } from "../styling/BookingPageStyle";
import {Car} from "../../backend/models";
import {API_BASE_URL} from "@env";
import {SafeAreaView} from "react-native-safe-area-context";
import CarMapView from '../components/CarMapView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapStackParamList } from '../components/BottomNav';
import Header from "../components/Header";

type MapPageProps = NativeStackScreenProps<MapStackParamList, 'MapPage'>;

const MapPage: React.FC<MapPageProps> = ({ route }) => {
    const { camera } = route.params || {};

    return (
        <SafeAreaView edges={["left", "right"]} style={{flex: 1}}>
            <Header/>
            <CarMapView type="large" camera={camera}/>
        </SafeAreaView>
    )
};

export default MapPage;

