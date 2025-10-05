import AsyncStorage from "@react-native-async-storage/async-storage";
import {Car, Booking, User} from "./models";
import axios from "axios";
import {API_BASE_URL} from '@env';

export class CarService {
    private cars: Car[] = [];
    private static instance: CarService;

    static async getInstance(): Promise<CarService> {
        if (!CarService.instance) {
            CarService.instance = new CarService();
            await CarService.instance.initialize();
        }
        return CarService.instance;
    }

    private async initialize() {
        let promise = new Promise<void>((resolve) => {
            AsyncStorage.getItem('cars').then(data => {
                if (data !== null) {
                    let jsonData = JSON.parse(data);
                    if (Array.isArray(jsonData) && jsonData.length > 0 && jsonData[0].id) {
                        this.cars = jsonData;
                        resolve();
                        console.log("Loaded cars from AsyncStorage");
                    }
                }
                axios.get(`${API_BASE_URL}/cars`)
                    .then(response => {
                        this.cars = response.data;
                        resolve();
                        AsyncStorage.setItem('cars', JSON.stringify(this.cars));
                        console.log("Fetched cars from API and stored in AsyncStorage");
                        // console.log(this.cars);
                    })
                    .catch(error => {
                        console.error("Error fetching cars from API:", error, " ", error.response);
                    });
            });
        });
        await promise;
    }

    private constructor() {}

    getAllCars(): Car[] {
        return this.cars;
    }

    getCarById(id: string): Car | undefined {
        return this.cars.find(car => car.id === id);
    }
}

export class UserService {
    private users: User[] = [];
    private static instance: UserService;
    private currentUser: User | null = null;

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    private constructor() {
        // TODO: use server API to fetch users
        this.currentUser = this.users[0]; // Simulate logged-in user
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}