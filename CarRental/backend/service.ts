import AsyncStorage from "@react-native-async-storage/async-storage";
import {Car, Booking, User} from "./models";
import axios from "axios";

export class CarService {
    private cars: Car[] = [];
    private static instance: CarService;
    
    static getInstance(): CarService {
        if (!CarService.instance) {
            CarService.instance = new CarService();
        }
        return CarService.instance;
    }

    private constructor() {
        AsyncStorage.getItem('cars').then(data => {
            if (data !== null) {
                this.cars = JSON.parse(data);
                console.log("Loaded cars from AsyncStorage");
            }
            axios.get('https://raw.githubusercontent.com/albertecos/CarRentalApp_MSD/refs/heads/main/CarRental/backend/data/cars.json')
            .then(response => {
                this.cars = response.data;
                AsyncStorage.setItem('cars', JSON.stringify(this.cars));
                console.log("Fetched cars from API and stored in AsyncStorage");
            })
            .catch(error => {
                console.error("Failed to fetch cars from API, loading dummy data", error);
                this.cars = require('./data/cars').cars; // TODO: Load from JSON file
                AsyncStorage.setItem('cars', JSON.stringify(this.cars));
            });
        });

    }
    
    getAllCars(): Car[] {
        return this.cars;
    }
    
    getCarById(id: string): Car | undefined {
        return this.cars.find(car => car.id === id);
    }
}

export class BookingService {
    private bookings: Booking[] = [];
    private static instance: BookingService;
    
    static getInstance(): BookingService {
        if (!BookingService.instance) {
            BookingService.instance = new BookingService();
        }
        return BookingService.instance;
    }

    private constructor() {
        // Load dummy data from TypeScript file
        this.bookings = require('./data/bookings').bookings;
    }

    getMyBookings(userId: string): Booking[] {
        return this.bookings.filter(booking => booking.userId === userId);
    }
    
    getBookingById(id: string): Booking | undefined {
        return this.bookings.find(booking => booking.id === id);
    }

    createBooking(booking: Booking): Booking {
        this.bookings.push(booking);
        return booking;
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
        // Load dummy data from TypeScript file
        this.users = require('./data/users').users;
        this.currentUser = this.users[0]; // Simulate logged-in user
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}